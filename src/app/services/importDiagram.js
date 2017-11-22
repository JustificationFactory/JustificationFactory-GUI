/// <reference path=".\diagram.ts" />
var KeyValueEvidence = (function () {
    function KeyValueEvidence(conclusionId, evidence) {
        this.conclusionId = conclusionId;
        this.evidence = evidence;
    }
    return KeyValueEvidence;
}());
var ParseDiagramElementsResult = (function () {
    function ParseDiagramElementsResult(listElements, businessSteps) {
        this.listElements = listElements;
        this.businessSteps = businessSteps;
    }
    return ParseDiagramElementsResult;
}());
var ParseJson2DiagramElements = (function () {
    function ParseJson2DiagramElements(globalJson) {
        this.globalJson = globalJson;
    }
    ParseJson2DiagramElements.prototype.getDiagramElements = function () {
        var conclusions = new Array();
        var strategies = new Array();
        var actors = new Array();
        var rationales = new Array();
        var kvevidences = new Array();
        var supports = new Array();
        var links = new Array();
        this.businessSteps = new Array();
        for (var _i = 0, _a = this.globalJson.steps.step; _i < _a.length; _i++) {
            var step = _a[_i];
            var businessStep = new Step(undefined);
            var nameOfConclusion = step.conclusion.name;
            var typeOfConclusion = step.conclusion.element.type;
            var conclusionN = new Conclusion(nameOfConclusion, [step.conclusion], typeOfConclusion);
            conclusions.push(conclusionN);
            conclusionN.stepId = businessStep.getStepId();
            businessStep.items.push(conclusionN);
            var nameOfstrategy = step.strategy.name;
            var typeOfstrategy = step.strategy.type;
            var strategyN = new Strategy(nameOfstrategy, [step.strategy], typeOfstrategy);
            strategies.push(strategyN);
            strategyN.stepId = businessStep.getStepId();
            businessStep.items.push(strategyN);
            links.push(strategyN.makeLinkWithParent(conclusionN));
            strategyN.artifacts = [];
            if (step.strategy.rationale) {
                var rationale = new Rationale("", [step.strategy.rationale][0], "");
                strategyN.artifacts.push(rationale);
                rationales.push(rationale);
                links.push(rationale.makeLinkWithParent(strategyN));
            }
            for (var _b = 0, _c = step.evidences.evidenceRoles; _b < _c.length; _b++) {
                var evidenceRole = _c[_b];
                var nameOfEvidence = evidenceRole.evidence.name;
                var typeOfEvidence = evidenceRole.evidence.element.type;
                var evidenceN = new Evidence(nameOfEvidence, [evidenceRole.evidence], typeOfEvidence);
                kvevidences.push(new KeyValueEvidence(conclusionN.getId(), evidenceN));
                evidenceN.stepId = businessStep.getStepId();
                businessStep.items.push(evidenceN);
                links.push(evidenceN.makeLinkWithParent(strategyN));
            }
            if ((step.strategy.type !== undefined) && (step.strategy.type.toLowerCase().indexOf('computed') >= 0)) {
                var actor = new Actor((step.strategy.actor !== undefined) ? step.strategy.actor.name : "", step.strategy.type, step.strategy.type);
                strategyN.artifacts.push(actor);
                actors.push(actor);
                links.push(actor.makeLinkWithParent(strategyN));
            }
            else if (step.strategy.actor) {
                var actor = new Actor(step.strategy.actor.name, step.strategy.actor, step.strategy.actor.role);
                strategyN.artifacts.push(actor);
                actors.push(actor);
                links.push(actor.makeLinkWithParent(strategyN));
            }
            this.businessSteps.push(businessStep);
        }
        //Merge where Conclusion == Evidence. Replace by Support.
        for (var i = conclusions.length - 1; i >= 0; i--) {
            var conclusioni = conclusions[i];
            for (var j = kvevidences.length - 1; j >= 0; j--) {
                var kvevidencej = kvevidences[j];
                if ((kvevidencej.conclusionId !== conclusioni.getId())
                    && (kvevidencej.evidence.name == conclusioni.name)) {
                    //Create Support object
                    var supportl = new Support(conclusioni, kvevidencej.evidence);
                    supports.push(supportl);
                    supportl.stepId = conclusioni.stepId;
                    //Needed for deserialization. DO NOT add this one to graph!
                    var supportl2 = new Support(conclusioni, kvevidencej.evidence);
                    supportl2.visualShape = supportl.visualShape;
                    supportl2.stepId = kvevidencej.evidence.stepId;
                    for (var _d = 0, _e = this.businessSteps; _d < _e.length; _d++) {
                        var businessStep = _e[_d];
                        if (supportl.stepId == businessStep.getStepId())
                            businessStep.items.push(supportl);
                        if (supportl2.stepId == businessStep.getStepId())
                            businessStep.items.push(supportl2);
                    }
                    for (var k = links.length - 1; k >= 0; k--) {
                        var linkk = links[k];
                        if (linkk.sourceElement.getId() === kvevidencej.evidence.getId()) {
                            linkk.setSource(supportl);
                        }
                        else if (linkk.targetElement.getId() === conclusioni.getId()) {
                            linkk.setTarget(supportl);
                        }
                    }
                    //Remove Conclusion and Evidence
                    conclusions.splice(i, 1);
                    kvevidences.splice(j, 1);
                }
            }
        }
        var elementsDiagram = [];
        //keep the order : rationales then evidences then actor => for alignment
        for (var _f = 0, conclusions_1 = conclusions; _f < conclusions_1.length; _f++) {
            var conclusion = conclusions_1[_f];
            elementsDiagram.push(conclusion);
        }
        for (var _g = 0, strategies_1 = strategies; _g < strategies_1.length; _g++) {
            var strategy = strategies_1[_g];
            elementsDiagram.push(strategy);
        }
        for (var _h = 0, rationales_1 = rationales; _h < rationales_1.length; _h++) {
            var rationale = rationales_1[_h];
            elementsDiagram.push(rationale);
        }
        for (var _j = 0, kvevidences_1 = kvevidences; _j < kvevidences_1.length; _j++) {
            var kvevidence = kvevidences_1[_j];
            elementsDiagram.push(kvevidence.evidence);
        }
        for (var _k = 0, actors_1 = actors; _k < actors_1.length; _k++) {
            var actor = actors_1[_k];
            elementsDiagram.push(actor);
        }
        for (var _l = 0, supports_1 = supports; _l < supports_1.length; _l++) {
            var support = supports_1[_l];
            elementsDiagram.push(support);
        }
        for (var _m = 0, links_1 = links; _m < links_1.length; _m++) {
            var link = links_1[_m];
            elementsDiagram.push(link);
        }
        return new ParseDiagramElementsResult(elementsDiagram, this.businessSteps);
    };
    ParseJson2DiagramElements.prototype.getTypeFromStringAttributs = function (strAttributs) {
        var type = "";
        try {
            var index1 = strAttributs.indexOf('"xsi:type":"') + 12;
            var str1 = strAttributs.substring(index1);
            var index2 = str1.indexOf('"');
            type = str1.substring(0, index2);
        }
        catch (e) {
        }
        return type;
    };
    return ParseJson2DiagramElements;
}());
var ImportDiagramWebService = (function () {
    function ImportDiagramWebService() {
    }
    return ImportDiagramWebService;
}());
//# sourceMappingURL=importDiagram.js.map