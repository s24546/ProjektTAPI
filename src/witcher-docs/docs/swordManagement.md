---
sidebar_position: 4
---
# Sword Management

Sword is a core entity in our API that represents witcher's primary weapons. Each sword contains detailed information about its properties and type. Witchers typically carry two swords - one silver for monsters and one steel for humans.

## Sword Structure

A sword object contains the following fields:

| Field       | Type   | Description                       | Required       |
|-------------|--------|-----------------------------------|----------------|
| id          | number | Unique identifier of the sword    | Auto-generated |
| name        | string | Name of the sword                 | Yes            |
| description | string | Detailed description of the sword | Yes            |
| type        | string | Always set to "sword"             | Auto-set       |
| material    | string | Material type (silver/steel)      | Yes            |

## Sword Materials

Two primary materials are available:
- `silver` - Used against monsters and supernatural beings
- `steel` - Used against humans and non-magical creatures

Each material has specific use cases:

### Silver Swords
- Effective against:
  - Vampires
  - Werewolves
  - Specters
  - Most supernatural creatures
- Special properties:
  - Conducts magical energy
  - Enhanced monster damage
  - Can be imbued with runes

### Steel Swords
- Effective against:
  - Humans
  - Animals
  - Non-magical beasts
- Special properties:
  - More durable
  - Better for parrying
  - Standard combat use

## Validation Rules

- All required fields must be provided
- `name` must not be empty
- `description` must provide clear information about the sword
- `material` must be either "silver" or "steel"
- Cannot change sword's material after creation
- Names should be unique for better identification

## Example Request

```json
{
  "name": "Aerondight",
  "description": "Legendary silver sword of incredible power",
  "material": "silver"
}
```

**Example Response**
```json
{
  "message": "Sword created successfully",
  "sword": {
    "id": 1,
    "name": "Aerondight",
    "description": "Legendary silver sword of incredible power",
    "type": "sword",
    "material": "silver",
    "createdAt": "2024-01-20T10:00:00.000Z"
  },
  "_links": {
    "self": {
      "href": "http://localhost:8080/api/swords/1"
    },
    "list": {
      "href": "http://localhost:8080/api/swords"
    }
  }
}
```

Enhancement System
Swords can be enhanced through several methods:

Runeword application
Silver/steel reinforcement
Magical enchantments
Physical modifications

Enhancement Rules

Each sword can have limited enhancements
Some enhancements are exclusive to material type
Enhancements cannot be removed
Quality affects enhancement effectiveness

Maintenance Guidelines
Proper sword maintenance includes:

Regular sharpening
Material-specific care
Protection from elements
Proper storage conditions

Silver Sword Care

Keep away from corrosive substances
Regular polishing required
Special oils for maintenance
Store in lined scabbard

Steel Sword Care

Regular oiling
Rust prevention
Impact damage checks
Edge maintenance

Usage Recommendations
Important considerations for sword use:

Match sword material to opponent
Maintain proper combat stance
Regular maintenance required
Consider environmental factors
Follow witcher combat techniques