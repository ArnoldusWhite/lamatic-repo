const flowConfig = {
  "id": "d05644e7-b871-4da1-bc67-0d24d6588ee4",
  "name": "Helpful Crayon",
  "nodes": [
    {
      "id": "triggerNode_1",
      "data": {
        "modes": {
          "sheetName": "list"
        },
        "nodeId": "googleSheetsNode",
        "values": {
          "nodeName": "Google Sheets",
          "syncMode": "incremental_append",
          "batchSize": "200",
          "credentials": "",
          "cronExpression": "0 0 00 1/1 * ? * UTC",
          "namesConversion": "false",
          "spreadSheetLink": "https://docs.google.com/spreadsheets/d/1wCDFdkWMvHtOqiGt6P2Dc1Br5MSnd03-dZL7QannzDM/edit?usp=sharing"
        },
        "trigger": true
      },
      "type": "triggerNode",
      "position": {
        "x": 0,
        "y": 0
      }
    },
    {
      "id": "LLMNode_420",
      "data": {
        "nodeId": "LLMNode",
        "values": {
          "tools": [],
          "prompts": [
            {
              "id": "187c2f4b-c23d-4545-abef-73dc897d6b7b",
              "role": "system",
              "content": "summarise this user data i got from the google sheet in form of a json. Make sure you give it without any JSON tag or backtick, or any leading statement.\n\nOUTPUT : {{triggerNode_1.output}}"
            }
          ],
          "memories": "[]",
          "messages": "[]",
          "nodeName": "Generate Text",
          "generativeModelName": {}
        }
      },
      "type": "dynamicNode",
      "position": {
        "x": 0,
        "y": 0
      }
    },
    {
      "id": "addNode_105",
      "data": {
        "nodeId": "addNode",
        "values": {
          "nodeName": ""
        }
      },
      "type": "addNode",
      "position": {
        "x": 0,
        "y": 0
      }
    }
  ],
  "edges": [
    {
      "id": "triggerNode_1-LLMNode_420",
      "type": "defaultEdge",
      "source": "triggerNode_1",
      "target": "LLMNode_420",
      "sourceHandle": "bottom",
      "targetHandle": "top"
    },
    {
      "id": "LLMNode_420-addNode_105",
      "type": "defaultEdge",
      "source": "LLMNode_420",
      "target": "addNode_105",
      "sourceHandle": "bottom",
      "targetHandle": "top"
    }
  ],
  "status": "active",
  "created_at": "2025-12-23T11:55:30.892931+00:00"
};

export async function getNodesAndEdges(): Promise<{
    nodes: Record<string, any>[],
    edges: Record<string, any>[],
}> {
    return {
        nodes: flowConfig.nodes,
        edges: flowConfig.edges,
    }
}

export async function getFlowConfig(): Promise<Record<string, any>> {
    return flowConfig;
}