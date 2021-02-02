import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';

export class CdkopaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = ec2.Vpc.fromLookup(this, "default_vpc", {
      isDefault: true
    });

    const sg_ssh = new ec2.SecurityGroup(this, 'ssh', {
      vpc: vpc,
      description: "Allow SSH from everywhere ;)",
      securityGroupName: "SSH from everywhere"
    });

    sg_ssh.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22));

    const amznLinux = ec2.MachineImage.latestAmazonLinux({
      generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX,
      edition: ec2.AmazonLinuxEdition.STANDARD,
      virtualization: ec2.AmazonLinuxVirt.HVM,
      storage: ec2.AmazonLinuxStorage.GENERAL_PURPOSE,
      cpuType: ec2.AmazonLinuxCpuType.X86_64,
    });

    const ec2instance = new ec2.Instance(this, 'cdk-opa', {
      instanceType: new ec2.InstanceType('t2.micro'),
      machineImage: amznLinux,
      vpc: vpc,
      securityGroup: sg_ssh
    });

  }
}
