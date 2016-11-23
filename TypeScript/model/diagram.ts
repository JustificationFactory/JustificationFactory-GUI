import Path = joint.shapes.basic.Path;
class Element {
    visualShape: Path;
    jsonElement: JSON;
    name: string;
    description:string;
    type:string;

    protected constructor(visualShape: Path, name: string, description: string, type: string) {
        this.visualShape = visualShape;
        this.name = name;
        this.description = description;
        this.type = type;
    }
}

enum Behavior {
    Embeded,
    Near
}

class Support extends Element {
    artifacts: Array<Artifact>;
}

class Conclusion extends Support {
    artifacts: Array<Artifact>;
}

class Evidence extends Support {
    artifacts: Array<Artifact>;
}

class Artifact extends Element {
    behavior: Behavior;
}

class Limitation extends Artifact{}
class Rationale extends Artifact{}
class Actor extends Artifact{}
class ForEach extends Artifact{}


