# Drill Format

Use this format for `/teach-polish` drill records. Keep the markdown readable for tutor review, then include one app-ready JSON payload for a future local import workflow.

Generated drills must stay source-backed. Cite learner snapshot fields, existing skill records, or user-provided corrections. If no learner snapshot was provided, say that clearly and avoid claiming learner-specific progress.

For the JSON contract, see `resources/generated-drill-json.md`.

````markdown
# Drill: Title

## Metadata
- Drill ID: pl-generated-short-kebab-id
- Generated: YYYY-MM-DD
- Level: A2 | A2+ | B1
- Language Tutor schema: language-tutor-generated-drill-v1
- Source: learner snapshot | skill record | user correction | user request

## Weak Area
- Stable weak-area ID and short label, such as `repair-phrases` - Repair phrases.

## Source Evidence
- Cite the exact snapshot field, skill record path, or user correction that justifies this drill.
- Include enough detail for a human to review the choice without opening app runtime code.

## Tiny Explanation
- One short explanation of the pattern or behavior being practiced.

## Examples
| Polish | English | Pronunciation |
| --- | --- | --- |
| | | |

## Quick Prompts
1. English or situational prompt -> expected Polish answer.
2.
3.
4.
5.

## Speaking Task
- One short speaking task that forces retrieval, not passive reading.

## Use Today
- One thing to say at home today.

## Retry And Proof
- Retry: when and how to retry missed prompts.
- Proof: what success looks like and what to log back in Language Tutor.

## Review Cards
- Polish phrase - English meaning

## App-Ready JSON
Copy only this fenced JSON object for a future local generated-drill import.

```json
{
  "schema": "language-tutor-generated-drill-v1",
  "generatedAt": "YYYY-MM-DDTHH:mm:ss.sssZ",
  "app": {
    "name": "Language Tutor",
    "module": "polish",
    "language": "pl"
  },
  "id": "pl-generated-short-kebab-id",
  "title": "Title",
  "level": "A2",
  "weakArea": "repair-phrases",
  "sourceEvidence": [
    {
      "type": "snapshot-field",
      "ref": "quiz.recentMisses[0]",
      "summary": "Recent missed prompt for a repair phrase."
    }
  ],
  "focus": "One sentence describing the behavior this drill improves.",
  "tinyExplanation": "One short explanation.",
  "examples": [
    {
      "pl": "Możesz powtórzyć?",
      "en": "Can you repeat that?",
      "pron": "MOH-zhesh pof-TOO-zhihch",
      "tags": ["repair", "wife-conversations"]
    }
  ],
  "quickPrompts": [
    {
      "id": "prompt-1",
      "prompt": "Ask her to repeat.",
      "expected": "Możesz powtórzyć?",
      "acceptedAnswers": ["Możesz powtórzyć?"]
    }
  ],
  "speakingTask": {
    "instruction": "Say all quick-prompt answers out loud, then use two in a tiny conversation.",
    "durationMinutes": 2
  },
  "useToday": "Ask for one repeat in Polish during a real conversation.",
  "retryPlan": {
    "retryAfterDays": 1,
    "retryPrompt": "Redo any missed quick prompts before adding new phrases.",
    "logType": "miss-drill"
  },
  "proofOfUse": {
    "successSignal": "The learner can recover from a missed word without switching fully to English.",
    "logSuggestion": {
      "type": "used-at-home",
      "summary": "Used one repair phrase in a real conversation."
    }
  },
  "reviewCards": [
    {
      "pl": "Możesz powtórzyć?",
      "en": "Can you repeat that?"
    }
  ]
}
```
````
