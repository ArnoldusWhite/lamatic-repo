const flowConfig = {
  "id": "6d5f3d9d-a7b8-4a04-8ffd-78dacac91b47",
  "name": "Late Appointment",
  "nodes": [
    {
      "id": "triggerNode_1",
      "data": {
        "nodeId": "postgresNode",
        "values": {
          "tables": "",
          "nodeName": "Postgres",
          "syncMode": "incremental_append",
          "credentials": "",
          "cronExpression": "0 0 00 1/1 * ? * UTC"
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
      "id": "codeNode_858",
      "data": {
        "nodeId": "codeNode",
        "values": {
          "code": "// Creating vectorData\nlet vectorData = \"title: \" + {{triggerNode_1.output.title}} + \" \\n toh: \" + {{triggerNode_1.output.toh}} + \" \\n content: \" + {{triggerNode_1.output.passage_content}}  + \" \\n type: \" + {{triggerNode_1.output.passage_type}}\n\n// for Multiple Toh id use one eg. toh312,toh628,toh1093 => toh312\n\nlet firstId = {{triggerNode_1.output.toh}}.split(',')[0];\n\nlet content = {{triggerNode_1.output.passage_content}}\nif({{triggerNode_1.output.restriction}}){\n  content = \"⚠ Restricted - \\n\\n \" + {{triggerNode_1.output.passage_content}}\n}\n\n// Creating MetaData\n\nlet MetaData = {\n  title: {{triggerNode_1.output.title}},       \n  content: content,\n  toh: firstId, \n  workxmlID: {{triggerNode_1.output.work_xmlid}},\n  passagexmlID: {{triggerNode_1.output.passage_xmlid}}, // Use as primary ?\n  date: {{triggerNode_1.output.publication_date}}, // Not Present\n  label: {{triggerNode_1.output.passage_label}},\n  type: {{triggerNode_1.output.passage_type}},\n  sort: {{triggerNode_1.output.sort}},\n  restriction: {{triggerNode_1.output.restriction}},\n  parent: {{triggerNode_1.output.passage_parent}}\n}\noutput = {\"vectorData\":[vectorData],\"MetaData\":[MetaData]};",
          "nodeName": "Make MetaData and VectorData"
        }
      },
      "type": "dynamicNode",
      "position": {
        "x": 0,
        "y": 0
      }
    },
    {
      "id": "vectorizeNode_738",
      "data": {
        "nodeId": "vectorizeNode",
        "values": {
          "nodeName": "Vectorize",
          "inputText": "{{codeNode_858.output.vectorData}}",
          "embeddingModelName": {}
        }
      },
      "type": "dynamicNode",
      "position": {
        "x": 0,
        "y": 0
      }
    },
    {
      "id": "IndexNode_451",
      "data": {
        "nodeId": "IndexNode",
        "values": {
          "nodeName": "Index Translation",
          "vectorDB": "",
          "primaryKeys": "",
          "vectorsField": "{{vectorizeNode_738.output.vectors}}",
          "metadataField": "{{codeNode_858.output.MetaData}}",
          "duplicateOperation": "overwrite",
          "embeddingModelName": {},
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
      "id": "addNode_565",
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
      "id": "triggerNode_1-codeNode_858",
      "type": "defaultEdge",
      "source": "triggerNode_1",
      "target": "codeNode_858",
      "sourceHandle": "bottom",
      "targetHandle": "top"
    },
    {
      "id": "codeNode_858-vectorizeNode_738",
      "type": "defaultEdge",
      "source": "codeNode_858",
      "target": "vectorizeNode_738",
      "sourceHandle": "bottom",
      "targetHandle": "top"
    },
    {
      "id": "vectorizeNode_738-IndexNode_451",
      "type": "defaultEdge",
      "source": "vectorizeNode_738",
      "target": "IndexNode_451",
      "sourceHandle": "bottom",
      "targetHandle": "top"
    },
    {
      "id": "IndexNode_451-addNode_565",
      "type": "defaultEdge",
      "source": "IndexNode_451",
      "target": "addNode_565",
      "sourceHandle": "bottom",
      "targetHandle": "top"
    }
  ],
  "status": "active",
  "created_at": "2025-12-23T08:39:17.440592+00:00"
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