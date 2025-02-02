#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { CfnRepository } from "aws-cdk-lib/aws-ecr";
import { IConstruct } from "constructs";
import { CdkStageStack } from "../lib/cdk-stage-stack";

const app = new cdk.App();

const availableStages = ["dev", "stg", "prod"] as const;
type Stage = (typeof availableStages)[number];

const isValidStage = (stage: string): stage is Stage => {
  return availableStages.includes(stage as Stage);
};

const stage = app.node.tryGetContext("stage");
if (!isValidStage(stage)) {
  throw new Error(`Invalid stage: ${stage}`);
}

cdk.Tags.of(app).add("Project", "MyProject");

new CdkStageStack(app, `CdkStageStack-${stage}`, {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

class EnforceDeletionPolicy implements cdk.IAspect {
  public visit(node: IConstruct): void {
    if (node instanceof cdk.CfnResource) {
      node.applyRemovalPolicy(cdk.RemovalPolicy.DESTROY);
    }
    if (node instanceof CfnRepository) {
      node.emptyOnDelete = true;
    }
  }
}

if (stage === "dev") {
  cdk.Aspects.of(app).add(new EnforceDeletionPolicy());
}
