---
sidebar_position: 3
---

# Swords

### Retrieve Sword by ID

---

#### Method: **GET**

##### Path:
`api/swords/{id}`

##### Parameters:
| Name | Type    | Required | Description                    |
|------|---------|----------|--------------------------------|
| `id` | integer | Yes      | Unique identifier of the sword |

---

#### Request Example:
```http
GET api/swords/1 HTTP/2.0
Host: localhost:8080
```

#### **Responses:**
#### **200 OK**
Sword data has been successfully retrieved.
**Example Response:**
```json
{
  "id": 1,
  "name": "Aerondight",
  "description": "Legendary silver sword",
  "type": "sword",
  "material": "silver",
  "_links": {
    "self": {
      "href": "http://localhost:8080/api/swords/1"
    }
  }
}
```

### **404 Not Found**
The specified sword ID does not exist.

**Example Response:**
```json
{
  "error": "Sword not found"
}
```

### **500 Internal Server Error**r
Error reading swords file
**Example Response:**
```json
{
  "error": "Error processing sword data"
}
```

---

### Retrieve Sword's List

---

#### Method: **GET**

#### Path:
`api/swords`

#### Parameters:
| Name       | Type   | Required | Description                       |
|------------|--------|----------|-----------------------------------|
| `material` | string | No       | Filter by material (silver/steel) |


#### Request Example:
```http
GET api/swords?material=silver HTTP/2.0
Host: localhost:8080
```

### **Responses:**

### **200 OK**
Sword data

**Example Response:**
```json
{
  "swordsList": [
    {
      "id": 1,
      "name": "Aerondight",
      "description": "Legendary silver sword",
      "type": "sword",
      "material": "silver",
      "_links": {
        "self": {
          "href": "http://localhost:8080/api/swords/1"
        }
      }
    }
  ],
  "_links": {
    "self": {
      "href": "http://localhost:8080/api/swords"
    }
  }
}
```

#### **404 Not Found**
Empty sword list

**Example Response:**
```json
{
  "error": "No content, empty swords list"
}
```

#### **500 Internal Server Error**
Error reading swords file

**Example Response:**
```json
{
  "error": "Error processing swords data"
}
```

---

### Create New Sword

---


#### Method: **POST**

##### Path:
`api/swords`

##### Request Body:
| Name          | Type   | Required | Description             |
|---------------|--------|----------|-------------------------|
| `name`        | string | Yes      | Sword's name            |
| `description` | string | Yes      | Sword's description     |
| `material`    | string | Yes      | Material (silver/steel) |

---

#### Request Example:
```http
POST api/swords HTTP/2.0
Host: localhost:8080
Content-Type: application/json

{
  "name": "Aerondight",
  "description": "Legendary silver sword",
  "material": "silver"
}
```
#### **Responses:**

#### **201 Created**
Sword has been successfully created.
**Example Response:**
```json
{
  "message": "Sword created successfully",
  "sword": {
    "id": 1,
    "name": "Aerondight",
    "description": "Legendary silver sword",
    "type": "sword",
    "material": "silver"
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
#### **400 Bad Request**
Invalid input

**Example Response:**
```json
{
  "error": "All fields are required"
}
```
#### **500 Internal Server Error**
Error saving sword
**Example Response:**
```json
{
  "error": "Error creating sword"
}
```

---

### Update Sword

--- 

#### Method: **PUT**

##### Path:
`api/swords/{id}`

##### Parameters:
| Name  | Type    | Required | Description                    |
|-------|---------|----------|--------------------------------|
| `id`  | integer | Yes      | Unique identifier of the sword |

##### Request Body:
| Name          | Type   | Required | Description             |
|---------------|--------|----------|-------------------------|
| `name`        | string | Yes      | Sword's name            |
| `description` | string | Yes      | Sword's description     |
| `material`    | string | Yes      | Material (silver/steel) |

---

#### Request Example:
```http
PUT api/swords/1 HTTP/2.0
Host: localhost:8080
Content-Type: application/json

{
  "name": "Enhanced Aerondight",
  "description": "Upgraded legendary silver sword",
  "material": "silver"
}
```
**Responses:**

#### **200 OK**
Sword has been successfully updated.
**Example Response**
```json
{
  "message": "Sword updated successfully",
  "sword": {
    "id": 1,
    "name": "Enhanced Aerondight",
    "description": "Upgraded legendary silver sword",
    "type": "sword",
    "material": "silver"
  },
  "_links": {
    "self": {
      "href": "http://localhost:8080/api/swords/1"
    }
  }
}
```
#### **404 Not Found**
The specified sword ID does not exist.

**Example Response**
```json
{
  "error": "Sword not found"
}
```

#### **500 Internal Server Error**
Error updating sword

**Example Response**
```json
{
  "error": "Error updating sword"
}
```

---

### Patch Sword

---


#### Method: **PATCH**

##### Path:
`api/swords/{id}`

##### Parameters:
| Name  | Type    | Required | Description                    |
|-------|---------|----------|--------------------------------|
| `id`  | integer | Yes      | Unique identifier of the sword |

##### Request Body:
| Name          | Type   | Required | Description             |
|---------------|--------|----------|-------------------------|
| `name`        | string | Yes      | Sword's name            |
| `description` | string | Yes      | Sword's description     |
| `material`    | string | Yes      | Material (silver/steel) |

---

#### Request Example:
```http
PATCH api/swords/1 HTTP/2.0
Host: localhost:8080
Content-Type: application/json

{
  "description": "Updated description for legendary silver sword"
}

```

**Responses:**

#### **200 OK**
Sword has been successfully updated.

**Example Response**
```json
{
  "sword": {
    "id": 1,
    "name": "Aerondight",
    "description": "Updated description for legendary silver sword",
    "type": "sword",
    "material": "silver"
  },
  "_links": {
    "self": {
      "href": "http://localhost:8080/api/swords/1"
    }
  }
}
```

#### **404 Not Found**
The specified sword ID does not exist.
**Example Response**
```json
{
  "error": "Sword not found"
}
```

#### **500 Internal Server Error**
Error updating sword
**Example Response**
```json
{
  "error": "Error updating sword"
}
```

---

### Delete Sword

---

#### Method: **DELETE**

##### Path:
`api/swords/{id}`

##### Parameters:
| Name  | Type    | Required | Description                    |
|-------|---------|----------|--------------------------------|
| `id`  | integer | Yes      | Unique identifier of the sword |

#### Request Example:
```http
DELETE api/swords/1 HTTP/2.0
Host: localhost:8080
```

**Responses:**

#### **200 OK**
Sword has been successfully deleted.

**Example Response**
```json
{
  "message": "Sword deleted successfully",
  "_links": {
    "list": {
      "href": "http://localhost:8080/api/swords"
    }
  }
}
```

#### **404 Not Found**
The specified sword ID does not exist.

**Example Response**
```json
{
  "error": "Sword not found"
}
```
#### **500 Internal Server Error**
Error deleting sword

**Example Response:**
```json
{
  "error": "Error deleting sword"
}