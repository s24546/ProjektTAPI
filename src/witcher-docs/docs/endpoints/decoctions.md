---
sidebar_position: 1
---

# Decoctions

### Retrieve Decoction by ID

---

#### Method: **GET**

##### Path:
`api/decoctions/{id}`

##### Parameters:
| Name | Type    | Required | Description                        |
|------|---------|----------|------------------------------------|
| `id` | integer | Yes      | Unique identifier of the decoction |

---

#### Request Example:
```http
GET api/decoctions/1 HTTP/2.0
Host: localhost:8080
```

#### **Responses:**
#### **200 OK**
Decoction data has been successfully retrieved.

**Example Response:**
```json
{
  "id": 1,
  "name": "Cat",
  "description": "Enhances witcher's night vision",
  "type": "decoction",
  "ingredients": "Cat mutagen, Rebis",
  "duration": "30min",
  "toxicity": 25,
  "_links": {
    "self": {
      "href": "http://localhost:8080/api/decoctions/1"
    }
  }
}
```

### **404 Not Found**
The specified decoction ID does not exist.

**Example Response:**
```json
{
  "error": "Decoction not found"
}
```

### **500 Internal Server Error**
Error reading decoctions file

**Example Response:**
```json
{
  "error": "Error processing decoction data"
}
```
---

### Retrieve Decoction's List

---

#### Method: **GET**

#### Path:
`api/decoctions`

#### Parameters:
| Name  | Type   | Required | Description            |
|-------|--------|----------|------------------------|
| `min` | number | No       | Minimum toxicity level |
| `max` | number | No       | Maximum toxicity level |


#### Request Example:
```http
GET api/decoctions?min=20&max=50 HTTP/2.0
Host: localhost:8080
```

**Responses:**

#### **200 OK**
Decoction data

**Example Response**
```json
{
  "decoctionsList": [
    {
      "id": 1,
      "name": "Cat",
      "description": "Enhances witcher's night vision",
      "type": "decoction",
      "ingredients": "Cat mutagen, Rebis",
      "duration": "30min",
      "toxicity": 25,
      "_links": {
        "self": {
          "href": "http://localhost:8080/api/decoctions/1"
        }
      }
    }
  ],
  "_links": {
    "self": {
      "href": "http://localhost:8080/api/decoctions"
    }
  }
}
```

#### **404 Not Found**
Empty decoction list

**Example Response**
```json
{
  "error": "No content, empty decoctions list"
}
```

#### **500 Internal Server Error**
Error reading decoctions file

**Example Response**
```json
{
  "error": "Error processing decoctions data"
}
```

---

### Create New Decoction

---
#### Method: **POST**

##### Path:
`api/decoctions`

##### Request Body:
| Name          | Type   | Required | Description             |
|---------------|--------|----------|-------------------------|
| `name`        | string | Yes      | Decoction's name        |
| `description` | string | Yes      | Decoction's description |
| `ingredients` | string | Yes      | Required ingredients    |
| `duration`    | string | Yes      | Duration of effect      |
| `toxicity`    | number | Yes      | Toxicity level          |

---


#### Request Example:
```http
POST api/decoctions HTTP/2.0
Host: localhost:8080
Content-Type: application/json

{
  "name": "Cat",
  "description": "Enhances witcher's night vision",
  "ingredients": "Cat mutagen, Rebis",
  "duration": "30min",
  "toxicity": 25
}

```
**Responses:**

#### **201 Created**
Decoction has been successfully created.

**Example Response**
```json
{
  "message": "Decoction created successfully",
  "decoction": {
    "id": 1,
    "name": "Cat",
    "description": "Enhances witcher's night vision",
    "type": "decoction",
    "ingredients": "Cat mutagen, Rebis",
    "duration": "30min",
    "toxicity": 25
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

#### **404 Not Found**
Invalid input
**Example Response**
```json
{
  "error": "All fields are required"
}
```
#### **500 Internal Server Error**
Error saving decoction
**Example Response**
```json
{
  "error": "Error creating decoction"
}
```

---

### Update Decoction

---

#### Method: **PUT**

##### Path:
`api/decoctions/{id}`

##### Parameters:
| Name | Type    | Required | Description                        |
|------|---------|----------|------------------------------------|
| `id` | integer | Yes      | Unique identifier of the decoction |

##### Request Body:
| Name          | Type   | Required | Description             |
|---------------|--------|----------|-------------------------|
| `name`        | string | Yes      | Decoction's name        |
| `description` | string | Yes      | Decoction's description |
| `ingredients` | string | Yes      | Required ingredients    |
| `duration`    | string | Yes      | Duration of effect      |
| `toxicity`    | number | Yes      | Toxicity level          |

---

#### Request Example:
```http
PUT api/decoctions/1 HTTP/2.0
Host: localhost:8080
Content-Type: application/json

{
  "name": "Enhanced Cat",
  "description": "Greatly enhances witcher's night vision",
  "ingredients": "Cat mutagen, Rebis, Aether",
  "duration": "45min",
  "toxicity": 35
}
```
**Responses:**

#### **200 OK**
Decoction has been successfully updated.

**Example Response**
```json
{
  "message": "Decoction updated successfully",
  "decoction": {
    "id": 1,
    "name": "Enhanced Cat",
    "description": "Greatly enhances witcher's night vision",
    "type": "decoction",
    "ingredients": "Cat mutagen, Rebis, Aether",
    "duration": "45min",
    "toxicity": 35
  },
  "_links": {
    "self": {
      "href": "http://localhost:8080/api/decoctions/1"
    }
  }
}
```

#### **404 Not Found**
The specified decoction ID does not exist.

**Example Response**
```json
{
  "error": "Decoction not found"
}
```

#### **500 Internal Server Error**
Error updating decoction

**Example Response:**
```json
{
  "error": "Error updating decoction"
}
```

---

### Patch Decoction

---

#### Method: **PATCH**

##### Path:
`api/decoctions/{id}`

##### Parameters:
| Name | Type    | Required | Description                        |
|------|---------|----------|------------------------------------|
| `id` | integer | Yes      | Unique identifier of the decoction |

##### Request Body:
| Name          | Type   | Required | Description             |
|---------------|--------|----------|-------------------------|
| `name`        | string | Yes      | Decoction's name        |
| `description` | string | Yes      | Decoction's description |
| `ingredients` | string | Yes      | Required ingredients    |
| `duration`    | string | Yes      | Duration of effect      |
| `toxicity`    | number | Yes      | Toxicity level          |

---

#### Request Example:
```http
PATCH api/decoctions/1 HTTP/2.0
Host: localhost:8080
Content-Type: application/json

{
  "toxicity": 30
}
```

**Responses:**

#### **200 OK**
Decoction has been successfully updated.
**Example Response**
```json
{
  "decoction": {
    "id": 1,
    "name": "Cat",
    "description": "Enhances witcher's night vision",
    "type": "decoction",
    "ingredients": "Cat mutagen, Rebis",
    "duration": "30min",
    "toxicity": 30
  },
  "_links": {
    "self": {
      "href": "http://localhost:8080/api/decoctions/1"
    }
  }
}
```

#### **404 Not Found**
The specified decoction ID does not exist.

**Example Response**
```json
{
  "error": "Decoction not found"
}
```

#### **500 Internal Server Error**
Error updating decoction

**Example Response**
```json
{
  "error": "Error updating decoction"
}
```

---

### Delete Decoction

---

#### Method: **DELETE**

##### Path:
`api/decoctions/{id}`

##### Parameters:
| Name | Type    | Required | Description                        |
|------|---------|----------|------------------------------------|
| `id` | integer | Yes      | Unique identifier of the decoction |

#### Request Example:
```http
DELETE api/decoctions/1 HTTP/2.0
Host: localhost:8080
```

**Responses:**

#### **200 OK**
Decoction has been successfully deleted.

**Example Response**
```json
{
  "message": "Decoction deleted successfully",
  "_links": {
    "list": {
      "href": "http://localhost:8080/api/decoctions"
    }
  }
}
```

#### **404 Not Found**
The specified decoction ID does not exist.

**Example Response**
```json
{
  "error": "Decoction not found"
}
```

#### **500 Internal Server Error**
Error deleting decoction

**Example Response:**
```json
{
  "error": "Error deleting decoction"
}
```