---
sidebar_position: 2
---

# Decoction Management

Decoction is a core entity in our API that represents powerful witcher potions. Each decoction contains detailed information about its effects, toxicity level, and required ingredients.

## Decoction Structure

A decoction object contains the following fields:

| Field       | Type   | Description                        | Required       |
|-------------|--------|------------------------------------|----------------|
| id          | number | Unique identifier of the decoction | Auto-generated |
| name        | string | Name of the decoction              | Yes            |
| description | string | Detailed description of effects    | Yes            |
| type        | string | Always set to "decoction"          | Auto-set       |
| ingredients | string | List of required ingredients       | Yes            |
| duration    | string | Duration of effects                | Yes            |
| toxicity    | number | Toxicity level (0-100)             | Yes            |

## Decoction Types

The following decoction types are available:
- `Combat Decoctions` - Enhance combat abilities (e.g., Werewolf decoction)
- `Utility Decoctions` - Provide utility effects (e.g., Cat decoction for night vision)
- `Resistance Decoctions` - Increase resistances (e.g., Ekimmara decoction)
- `Recovery Decoctions` - Aid in recovery (e.g., Troll decoction)
- `Enhancement Decoctions` - Enhance physical attributes (e.g., Earth elemental decoction)

## Toxicity Management

Toxicity is a crucial aspect of decoction usage:
- Toxicity range: 0-100
- Low toxicity: 0-25 (Safe to use)
- Medium toxicity: 26-50 (Caution needed)
- High toxicity: 51-75 (Dangerous)
- Critical toxicity: 76-100 (Extremely dangerous)

## Validation Rules

- All required fields must be provided
- `name` must not be empty
- `description` must detail the effects clearly
- `ingredients` must list all required components
- `duration` must be in format "XXmin" or "XXh"
- `toxicity` must be between 0 and 100

## Example Request

```json
{
  "name": "Cat",
  "description": "Grants perfect vision in total darkness",
  "ingredients": "Cat mutagen, Rebis, White Gull",
  "duration": "30min",
  "toxicity": 25
}
```

**Example Response**
```json
{
  "message": "Decoction created successfully",
  "decoction": {
    "id": 1,
    "name": "Cat",
    "description": "Grants perfect vision in total darkness",
    "type": "decoction",
    "ingredients": "Cat mutagen, Rebis, White Gull",
    "duration": "30min",
    "toxicity": 25,
    "createdAt": "2024-01-20T10:00:00.000Z"
  },
  "_links": {
    "self": {
      "href": "http://localhost:8080/api/decoctions/1"
    },
    "list": {
      "href": "http://localhost:8080/api/decoctions"
    }
  }
}
```

Ingredient Requirements
Each decoction requires specific ingredients:
Base Components

Monster mutagens (specific to decoction type)
Alchemical substances (Rebis, Aether, etc.)
Special ingredients (White Gull, Dwarven Spirit)

Quality Factors

Mutagen quality affects potency
Ingredient freshness matters
Proper proportions are crucial
Some ingredients are rare or unique

Brewing Process

Gather required ingredients
Process mutagens
Mix with alchemical substances
Brew under specific conditions

Usage Guidelines
Important considerations for decoction use:

Monitor toxicity levels
Don't exceed recommended combinations
Consider duration of effects
Be aware of side effects
Have antidotes ready

Storage and Duration

Keep in proper containers
Maintain specific temperature
Limited shelf life
Cannot be diluted
Cannot be combined directly