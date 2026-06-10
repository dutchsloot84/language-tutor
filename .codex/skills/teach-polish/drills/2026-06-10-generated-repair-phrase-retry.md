# Drill: Generated Repair Phrase Retry

## Metadata
- Drill ID: pl-generated-repair-phrase-retry
- Generated: 2026-06-10
- Level: A2
- Language Tutor schema: language-tutor-generated-drill-v1
- Source: skill record and skill resource docs; no learner snapshot was provided for this sample

## Weak Area
`repair-phrases` - staying in Polish when a word or phrase is missed.

## Source Evidence
- `.codex/skills/teach-polish/drills/repair-phrases-with-wife.md`: existing starter drill teaches repair phrases for staying in Polish with the learner's wife.
- `.codex/skills/teach-polish/resources/learner-snapshot-schema.md`: `repair-phrases` is a stable weak-area ID, and future drills should prioritize recent corrections, quiz misses, review misses, hard phrases, and due reviews.
- `.codex/skills/teach-polish/SKILL.md`: `/teach-polish` prioritizes practical family/home Polish and repair phrases like asking someone to repeat.

## Tiny Explanation
When you miss a word, use one Polish repair phrase first. The goal is not perfect grammar; the goal is to keep the conversation alive in Polish.

## Examples
| Polish | English | Pronunciation |
| --- | --- | --- |
| Możesz powtórzyć? | Can you repeat that? | MOH-zhesh pof-TOO-zhihch |
| Możesz powiedzieć wolniej? | Can you say it slower? | MOH-zhesh poh-VYEH-jetch VOL-nyei |
| Nie rozumiem jeszcze. | I do not understand yet. | nyeh roh-ZOO-myem YESH-cheh |
| Jak to powiedzieć po polsku? | How do you say this in Polish? | yak toh poh-VYEH-jetch poh POL-skoo |
| Popraw mnie, proszę. | Correct me, please. | POH-praf mnyeh PROH-sheh |
| Czy tak jest dobrze? | Is it right like this? | chih tak yest DOB-zheh |

## Quick Prompts
1. Ask her to repeat. -> Możesz powtórzyć?
2. Ask her to say it slower. -> Możesz powiedzieć wolniej?
3. Say you do not understand yet. -> Nie rozumiem jeszcze.
4. Ask how to say it in Polish. -> Jak to powiedzieć po polsku?
5. Ask her to correct you. -> Popraw mnie, proszę.
6. Ask whether your phrase is correct. -> Czy tak jest dobrze?

## Speaking Task
Say all six answers out loud once. Then do a two-minute pretend exchange where you use at least two repair phrases before switching to English.

## Use Today
In one real conversation with your wife, ask for a repeat or correction in Polish before switching to English.

## Retry And Proof
- Retry: tomorrow, redo any quick prompt that took more than three seconds today.
- Proof: log `used-at-home` if one repair phrase worked in a real conversation, or log `hesitation` if you froze and need a smaller retry.

## Review Cards
- Możesz powtórzyć? - Can you repeat that?
- Możesz powiedzieć wolniej? - Can you say it slower?
- Nie rozumiem jeszcze. - I do not understand yet.
- Jak to powiedzieć po polsku? - How do you say this in Polish?
- Popraw mnie, proszę. - Correct me, please.
- Czy tak jest dobrze? - Is it right like this?

## App-Ready JSON
Copy only this fenced JSON object for a future local generated-drill import.

```json
{
  "schema": "language-tutor-generated-drill-v1",
  "generatedAt": "2026-06-10T00:00:00.000Z",
  "app": {
    "name": "Language Tutor",
    "module": "polish",
    "language": "pl"
  },
  "id": "pl-generated-repair-phrase-retry",
  "title": "Generated Repair Phrase Retry",
  "level": "A2",
  "weakArea": "repair-phrases",
  "sourceEvidence": [
    {
      "type": "skill-record",
      "ref": ".codex/skills/teach-polish/drills/repair-phrases-with-wife.md",
      "summary": "Existing starter drill focuses on repair phrases for staying in Polish with the learner's wife."
    },
    {
      "type": "skill-record",
      "ref": ".codex/skills/teach-polish/resources/learner-snapshot-schema.md",
      "summary": "The learner snapshot schema defines repair-phrases as a stable weak-area ID and names correction, quiz miss, review miss, hard phrase, and due review evidence as tutor inputs."
    },
    {
      "type": "skill-record",
      "ref": ".codex/skills/teach-polish/SKILL.md",
      "summary": "The tutor skill prioritizes practical family/home Polish and repair phrases like asking someone to repeat."
    }
  ],
  "focus": "Recover from a missed word by asking for repetition, slower speech, or correction in Polish.",
  "tinyExplanation": "When you miss a word, use one Polish repair phrase first. The goal is to keep the conversation alive in Polish.",
  "examples": [
    {
      "pl": "Możesz powtórzyć?",
      "en": "Can you repeat that?",
      "pron": "MOH-zhesh pof-TOO-zhihch",
      "tags": ["repair", "wife-conversations"],
      "sourceRef": ".codex/skills/teach-polish/drills/repair-phrases-with-wife.md"
    },
    {
      "pl": "Możesz powiedzieć wolniej?",
      "en": "Can you say it slower?",
      "pron": "MOH-zhesh poh-VYEH-jetch VOL-nyei",
      "tags": ["repair", "wife-conversations"],
      "sourceRef": ".codex/skills/teach-polish/drills/repair-phrases-with-wife.md"
    },
    {
      "pl": "Nie rozumiem jeszcze.",
      "en": "I do not understand yet.",
      "pron": "nyeh roh-ZOO-myem YESH-cheh",
      "tags": ["repair", "wife-conversations"],
      "sourceRef": ".codex/skills/teach-polish/drills/repair-phrases-with-wife.md"
    },
    {
      "pl": "Jak to powiedzieć po polsku?",
      "en": "How do you say this in Polish?",
      "pron": "yak toh poh-VYEH-jetch poh POL-skoo",
      "tags": ["repair", "wife-conversations"],
      "sourceRef": ".codex/skills/teach-polish/drills/repair-phrases-with-wife.md"
    },
    {
      "pl": "Popraw mnie, proszę.",
      "en": "Correct me, please.",
      "pron": "POH-praf mnyeh PROH-sheh",
      "tags": ["repair", "wife-conversations"],
      "sourceRef": ".codex/skills/teach-polish/drills/repair-phrases-with-wife.md"
    },
    {
      "pl": "Czy tak jest dobrze?",
      "en": "Is it right like this?",
      "pron": "chih tak yest DOB-zheh",
      "tags": ["repair", "wife-conversations"],
      "sourceRef": ".codex/skills/teach-polish/drills/repair-phrases-with-wife.md"
    }
  ],
  "quickPrompts": [
    {
      "id": "prompt-1",
      "prompt": "Ask her to repeat.",
      "expected": "Możesz powtórzyć?",
      "acceptedAnswers": ["Możesz powtórzyć?"],
      "hint": "Start with Możesz..."
    },
    {
      "id": "prompt-2",
      "prompt": "Ask her to say it slower.",
      "expected": "Możesz powiedzieć wolniej?",
      "acceptedAnswers": ["Możesz powiedzieć wolniej?"],
      "hint": "Use wolniej for slower."
    },
    {
      "id": "prompt-3",
      "prompt": "Say you do not understand yet.",
      "expected": "Nie rozumiem jeszcze.",
      "acceptedAnswers": ["Nie rozumiem jeszcze."],
      "hint": "Use jeszcze for yet."
    },
    {
      "id": "prompt-4",
      "prompt": "Ask how to say it in Polish.",
      "expected": "Jak to powiedzieć po polsku?",
      "acceptedAnswers": ["Jak to powiedzieć po polsku?"],
      "hint": "Use po polsku for in Polish."
    },
    {
      "id": "prompt-5",
      "prompt": "Ask her to correct you.",
      "expected": "Popraw mnie, proszę.",
      "acceptedAnswers": ["Popraw mnie, proszę."],
      "hint": "Popraw mnie means correct me."
    },
    {
      "id": "prompt-6",
      "prompt": "Ask whether your phrase is correct.",
      "expected": "Czy tak jest dobrze?",
      "acceptedAnswers": ["Czy tak jest dobrze?"],
      "hint": "Use Czy tak... for Is it like this..."
    }
  ],
  "speakingTask": {
    "instruction": "Say all six answers out loud once. Then do a two-minute pretend exchange where you use at least two repair phrases before switching to English.",
    "durationMinutes": 2,
    "audience": "wife"
  },
  "useToday": "In one real conversation with your wife, ask for a repeat or correction in Polish before switching to English.",
  "retryPlan": {
    "retryAfterDays": 1,
    "retryPrompt": "Tomorrow, redo any quick prompt that took more than three seconds today.",
    "logType": "miss-drill"
  },
  "proofOfUse": {
    "successSignal": "The learner uses one repair phrase to recover from a missed word before switching to English.",
    "logSuggestion": {
      "type": "used-at-home",
      "summary": "Used a Polish repair phrase in a real conversation."
    }
  },
  "reviewCards": [
    {
      "pl": "Możesz powtórzyć?",
      "en": "Can you repeat that?"
    },
    {
      "pl": "Możesz powiedzieć wolniej?",
      "en": "Can you say it slower?"
    },
    {
      "pl": "Nie rozumiem jeszcze.",
      "en": "I do not understand yet."
    },
    {
      "pl": "Jak to powiedzieć po polsku?",
      "en": "How do you say this in Polish?"
    },
    {
      "pl": "Popraw mnie, proszę.",
      "en": "Correct me, please."
    },
    {
      "pl": "Czy tak jest dobrze?",
      "en": "Is it right like this?"
    }
  ],
  "tags": ["repair", "wife-conversations", "home-usage"]
}
```
