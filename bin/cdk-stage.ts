#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { CfnRepository } from "aws-cdk-lib/aws-ecr";
import { IConstruct } from "constructs";
import { MyAppStage } from "./stage";

const app = new cdk.App();

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

const dev = new MyAppStage(app, "DevStage");
cdk.Aspects.of(dev).add(new EnforceDeletionPolicy());
const stg = new MyAppStage(app, "StgStage");
const prod = new MyAppStage(app, "ProdStage");
