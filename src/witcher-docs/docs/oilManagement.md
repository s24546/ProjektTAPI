---
sidebar_position: 3
---

# Oil Management

Oil is a core entity in our API that represents blade oils used by witchers to enhance their swords against specific types of monsters. Each oil contains detailed information about its properties, ingredients, and usage capacity.

## Oil Structure

An oil object contains the following fields:

| Field       | Type   | Description                      | Required       |
|-------------|--------|----------------------------------|----------------|
| id          | number | Unique identifier of the oil     | Auto-generated |
| name        | string | Name of the oil                  | Yes            |
| description | string | Detailed description of the oil  | Yes            |
| type        | string | Always set to "oil"              | Auto-set       |
| ingredients | string | List of required ingredients     | Yes            |
| charges     | number | Number of applications available | Yes            |

## Oil Types (by enemy)

The following oil types are available:
- `Specter Oil` - Effective against wraiths and spectral beings
- `Vampire Oil` - Effective against vampires
- `Necrophage Oil` - Effective against necrophages
- `Beast Oil` - Effective against wild beasts
- `Cursed Oil` - Effective against cursed beings
- `Hybrid Oil` - Effective against hybrid monsters
- `Insectoid Oil` - Effective against insectoids
- `Draconid Oil` - Effective against draconids

## Validation Rules

- All required fields must be provided
- `name` must not be empty
- `description` must provide clear information about oil's effects
- `ingredients` must list all required components
- `charges` must be a positive number (> 0)
- `charges` cannot exceed 5 (maximum applications)

## Example Request

```json
{
  "name": "Enhanced Vampire Oil",
  "description": "Deadly against all types of vampires",
  "ingredients": "Wolfsbane, Crow's Eye, Mandrake Root",
  "charges": 3
}
```

**Example Response**
```json
{
  "message": "Oil created successfully",
  "oil": {
    "id": 1,
    "name": "Enhanced Vampire Oil",
    "description": "Deadly against all types of vampires",
    "type": "oil",
    "ingredients": "Wolfsbane, Crow's Eye, Mandrake Root",
    "charges": 3,
    "createdAt": "2024-01-20T10:00:00.000Z"
  },
  "_links": {
    "self": {
      "href": "http://localhost:8080/api/oils/1"
    },
    "list": {
      "href": "http://localhost:8080/api/oils"
    }
  }
}
```

Ingredient Management
Each oil requires specific ingredients to be crafted. The ingredients system follows these rules:
Basic Ingredients

Herbal ingredients (e.g., Fool's parsley leaves, Crow's Eye)
Monster parts (e.g., Drowner brain, Nekker eyes)
Alchemical substances (e.g., White vinegar, Dwarven spirit)

Quality Levels

Standard ingredients
Enhanced ingredients (for stronger variants)
Superior ingredients (for the most powerful oils)

Usage Guidelines

Ingredients must be properly listed
Some ingredients are rarer than others
Enhanced oils require higher quality ingredients
Superior oils need at least one rare ingredient

Oil Enhancement
Oils can be enhanced through several methods:

Adding more potent ingredients
Increasing concentration
Combining compatible effects

Usage Limitations

Each oil has limited charges (1-5)
Cannot be applied to non-witcher weapons
Effects are temporary
Cannot stack same oil type
