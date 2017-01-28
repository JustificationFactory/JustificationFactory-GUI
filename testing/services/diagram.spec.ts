///<reference path="../../typings/globals/testing/index.d.ts"/>

define(['app/services/diagram.js'], function(Diagram) {
    describe("diagram.", function () {

        beforeEach(() => {

        });

        describe("Util.", function () {

            it("getNewGuid", function () {
                let guid = Diagram.Util.getNewGuid();

                expect(guid).not.toBeUndefined();
                expect(guid.trim().length).toEqual(36);
            });

        });

        describe("DiagramElements.", function () {

            it("Evidence / Strategy / LinkElement", function () {
                let e = new Evidence("Evidence1", {test: "1"}, "type1");

                expect(e.getId()).not.toBeUndefined();
                expect(e.getId().trim().length).toEqual(36);
                expect(e.name).toEqual("Evidence1");
                expect(e.jsonElement.test).toEqual("1");
                expect(e.visualShape instanceof joint.shapes.basic.Path).toEqual(true);

                let s = new Strategy("Strategy1", {test: "2"}, "type2");

                expect(s.getId()).not.toBeUndefined();
                expect(s.getId().trim().length).toEqual(36);
                expect(s.name).toEqual("Strategy1");
                expect(s.jsonElement.test).toEqual("2");
                expect(s.visualShape instanceof joint.shapes.basic.Path).toEqual(true);

                let l = new LinkElement(e, s);

                expect(l.sourceElement.getId()).not.toBeUndefined(e.getId());
                expect(l.targetElement.getId()).not.toBeUndefined(s.getId());
            });

            it("Evidence / Conclusion / Support", function () {
                let e = new Evidence("Evidence1", {test: "1"}, "type1");

                let c = new Conclusion("Conclusion1", {test: "2"}, "type2");

                expect(c.getId()).not.toBeUndefined();
                expect(c.getId().trim().length).toEqual(36);
                expect(c.name).toEqual("Conclusion1");
                expect(c.jsonElement.test).toEqual("2");
                expect(c.visualShape instanceof joint.shapes.basic.Path).toEqual(true);

                let s = new Support(c, e);

                expect(s.getId()).not.toBeUndefined();
                expect(s.getId().trim().length).toEqual(36);
                expect(s.name).toEqual("Conclusion1");
                expect(s.jsonElement.test).toEqual("2");
                expect(s.visualShape instanceof joint.shapes.basic.Path).toEqual(true);
            });

            it("Conclusion / Artifact / Limitation", function () {
                let limitsInside = [{"element":{"type":"experimentation","persistent":true,"stimulation":{"code":"stimulation","path":"fr.axonic","persistent":true,"stimulationScheduler":{"code":"scheduler","path":"fr.axonic.stimulation","persistent":true,"from":{"code":"from","path":"fr.axonic.stimulation.scheduler","persistent":true,"value":{"type":"dateTime","value":"2017-01-12T11:19:35.22+01:00"}},"to":{"code":"to","path":"fr.axonic.stimulation.scheduler","persistent":true,"value":{"type":"dateTime","value":"2017-01-12T12:19:35.22+01:00"}}},"waveform":{"code":"waveform","path":"fr.axonic.stimulation","persistent":true,"value":"RECTANGULAR","range":[{"persistent":true,"value":"RECTANGULAR"},{"persistent":true,"value":"SINUS"},{"persistent":true,"value":"RAMP"}]},"waveformParameter":{"code":"waveformParameters","path":"fr.axonic.stimulation","persistent":true,"amplitude":{"type":"aContinuousNumber","code":"amplitude","path":"fr.axonic.stimulation","persistent":true,"value":{"type":"double","value":1000.1}},"duration":{"type":"aContinuousNumber","code":"duration","path":"fr.axonic.stimulation","persistent":true,"value":{"type":"int","value":300}},"frequency":{"type":"aContinuousNumber","code":"frequency","path":"fr.axonic.stimulation","persistent":true,"value":{"type":"double","value":500}}}},"subject":{"code":"subject","path":"fr.axonic","persistent":true,"dynamicInformations":{"code":"dynamic","path":"fr.axonic.subject","persistent":true,"bmi":{"code":"bmi","path":"fr.axonic.subject.dynamic","persistent":true,"value":{"type":"double","value":40}},"weight":{"code":"weight","path":"fr.axonic.subject.dynamic","persistent":true,"value":{"type":"double","value":130}}},"id":{"code":"id","path":"fr.axonic.subject","persistent":true,"value":{"type":"string","value":"12345"}},"pathologyInformations":{"code":"pathology","path":"fr.axonic.subject","persistent":true,"beginningOfObesity":{"code":"beginningObesity","path":"fr.axonic.subject.pathology","persistent":true,"value":{"type":"dateTime","value":"2017-01-12T11:19:35.242+01:00"}},"obesityType":{"type":"aRangedEnum","code":"obesityType","path":"fr.axonic.subject.pathology","persistent":true,"value":"GYNOID","range":[{"persistent":true,"value":"ANDROID"},{"persistent":true,"value":"GYNOID"},{"persistent":true,"value":"MIXED"}]}},"staticInformations":{"code":"static","path":"fr.axonic.subject","persistent":true,"birthday":{"code":"birthday","path":"fr.axonic.subject.static","persistent":true,"value":{"type":"dateTime","value":"2017-01-12T11:19:35.24+01:00"}},"gender":{"type":"aRangedEnum","code":"gender","path":"fr.axonic.subject.static","persistent":true,"value":"MALE","range":[{"persistent":true,"value":"MALE"},{"persistent":true,"value":"FEMALE"},{"persistent":true,"value":"UNKNOWN"}]},"height":{"code":"height","path":"fr.axonic.subject.static","persistent":true,"value":{"type":"double","value":70.5}},"name":{"code":"name","path":"fr.axonic.subject.static","persistent":true,"value":{"type":"string","value":"Paul"}}}}},
                    "name":"Experimentation",
                    "limits":{"subject":[{"code":"subject","path":"fr.axonic","persistent":true,"dynamicInformations":{"code":"dynamic","path":"fr.axonic.subject","persistent":true,"bmi":{"code":"bmi","path":"fr.axonic.subject.dynamic","persistent":true,"value":{"type":"double","value":40}},"weight":{"code":"weight","path":"fr.axonic.subject.dynamic","persistent":true,"value":{"type":"double","value":130}}},"id":{"code":"id","path":"fr.axonic.subject","persistent":true,"value":{"type":"string","value":"12345"}},"pathologyInformations":{"code":"pathology","path":"fr.axonic.subject","persistent":true,"beginningOfObesity":{"code":"beginningObesity","path":"fr.axonic.subject.pathology","persistent":true,"value":{"type":"dateTime","value":"2017-01-12T11:19:35.242+01:00"}},"obesityType":{"type":"aRangedEnum","code":"obesityType","path":"fr.axonic.subject.pathology","persistent":true,"value":"GYNOID","range":[{"persistent":true,"value":"ANDROID"},{"persistent":true,"value":"GYNOID"},{"persistent":true,"value":"MIXED"}]}},"staticInformations":{"code":"static","path":"fr.axonic.subject","persistent":true,"birthday":{"code":"birthday","path":"fr.axonic.subject.static","persistent":true,"value":{"type":"dateTime","value":"2017-01-12T11:19:35.24+01:00"}},"gender":{"type":"aRangedEnum","code":"gender","path":"fr.axonic.subject.static","persistent":true,"value":"MALE","range":[{"persistent":true,"value":"MALE"},{"persistent":true,"value":"FEMALE"},{"persistent":true,"value":"UNKNOWN"}]},"height":{"code":"height","path":"fr.axonic.subject.static","persistent":true,"value":{"type":"double","value":70.5}},"name":{"code":"name","path":"fr.axonic.subject.static","persistent":true,"value":{"type":"string","value":"Paul"}}}}],"stimulation":[{"code":"stimulation","path":"fr.axonic","persistent":true,"stimulationScheduler":{"code":"scheduler","path":"fr.axonic.stimulation","persistent":true,"from":{"code":"from","path":"fr.axonic.stimulation.scheduler","persistent":true,"value":{"type":"dateTime","value":"2017-01-12T11:19:35.22+01:00"}},"to":{"code":"to","path":"fr.axonic.stimulation.scheduler","persistent":true,"value":{"type":"dateTime","value":"2017-01-12T12:19:35.22+01:00"}}},"waveform":{"code":"waveform","path":"fr.axonic.stimulation","persistent":true,"value":"RECTANGULAR","range":[{"persistent":true,"value":"RECTANGULAR"},{"persistent":true,"value":"SINUS"},{"persistent":true,"value":"RAMP"}]},"waveformParameter":{"code":"waveformParameters","path":"fr.axonic.stimulation","persistent":true,"amplitude":{"type":"aContinuousNumber","code":"amplitude","path":"fr.axonic.stimulation","persistent":true,"value":{"type":"double","value":1000.1}},"duration":{"type":"aContinuousNumber","code":"duration","path":"fr.axonic.stimulation","persistent":true,"value":{"type":"int","value":300}},"frequency":{"type":"aContinuousNumber","code":"frequency","path":"fr.axonic.stimulation","persistent":true,"value":{"type":"double","value":500}}}}]}
                }
                ];

                let c = new Conclusion("Conclusion1", limitsInside, "type2");

                expect(c.artifacts.length).toEqual(2);
                expect(c.artifacts[0].name).toEqual("subject");
                expect(c.artifacts[1].name).toEqual("stimulation");
                expect((c.visualShape as any).portData.ports.length).toEqual(2);
            });

            it("Rationale / Actor", function () {
                let r = new Rationale("Rationale1", {test: "1"}, "type1");

                expect(r.getId()).not.toBeUndefined();
                expect(r.getId().trim().length).toEqual(36);
                expect(r.name).toEqual("Rationale1");
                expect(r.jsonElement.test).toEqual("1");
                expect(r.visualShape instanceof joint.shapes.basic.Rect).toEqual(true);

                let a = new Actor("Actor1", {test: "2"}, "type2");

                expect(a.getId()).not.toBeUndefined();
                expect(a.getId().trim().length).toEqual(36);
                expect(a.name).toEqual("Actor1");
                expect(a.jsonElement.test).toEqual("2");
                expect(a.visualShape instanceof joint.shapes.basic.Rect).toEqual(true);
            });

        });
    });
});