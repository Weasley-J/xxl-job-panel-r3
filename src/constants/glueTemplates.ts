import { GlueTypeEnum } from '@/types/enum'

/**
 * Glue 脚本模板
 */
export const glueTemplates: Partial<Record<GlueTypeEnum, string>> = {
  [GlueTypeEnum.GLUE_SHELL]: `#!/bin/bash

echo "Hello from shell script"`,

  [GlueTypeEnum.GLUE_PYTHON]: `def handler():
    # This function will be triggered by XXL-JOB
    print("Hello from Python")`,

  [GlueTypeEnum.GLUE_PHP]: `<?php

// Entry point for XXL-JOB
function handler() {
    echo "Hello from PHP";
}
handler();`,

  [GlueTypeEnum.GLUE_NODEJS]: `function handler() {
    // Entry point for XXL-JOB
    console.log("Hello from Node.js");
}
handler();`,

  [GlueTypeEnum.GLUE_POWERSHELL]: `# PowerShell script entry
Write-Output "Hello from PowerShell"`,

  [GlueTypeEnum.GLUE_GROOVY]: `class Handler {
    def execute() {
        println("Hello from Groovy")
    }
}
new Handler().execute()`,
}
