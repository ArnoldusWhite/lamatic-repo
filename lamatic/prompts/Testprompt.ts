const promptConfig = {
  "id": "5b6b4ab5-8ddd-4229-8ccb-8d900d089921",
  "name": "TestPrompt",
  "config": {
    "values": {
      "tools": [],
      "prompts": [
        {
          "id": "187c2f4b-c23d-4545-abef-73dc897d6b7b",
          "role": "system",
          "content": "You are an AI Assistant"
        },
        {
          "id": "187c2f4b-c23d-4545-abef-73dc897d6b7d",
          "role": "user",
          "content": "Write your prompt here"
        }
      ],
      "memories": "[]",
      "messages": "[]",
      "nodeName": "TestPrompt",
      "attachments": "",
      "credentials": "",
      "generativeModelName": [
        {
          "type": "generator/text",
          "params": {},
          "configName": "configA",
          "provider_name": "",
          "credential_name": ""
        }
      ]
    }
  },
  "type": "LLMNode",
  "status": "inactive",
  "created_at": "2025-12-23T10:28:45.310613+00:00"
};

export async function getPromptConfig(): Promise<Record<string, any>> {
    return promptConfig;
}