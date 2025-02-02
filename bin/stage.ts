import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { CdkStageStack } from "../lib/cdk-stage-stack";

export class MyAppStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new CdkStageStack(this, "CdkStageStack");
  }
}
