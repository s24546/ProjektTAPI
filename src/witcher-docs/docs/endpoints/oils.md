---
sidebar_position: 2
---

# Oils

### Retrieve Oil by ID

---

#### Method: **GET**

##### Path:
`api/oils/{id}`

##### Parameters:
| Name  | Type     | Required | Description                     |
|-------|----------|----------|---------------------------------|
| `id`  | integer  | Yes      | Unique identifier of the oil    |

---

#### Request Example:
```http
GET api/oils/1 HTTP/2.0
Host: localhost:8080
```
#### **Responses:**
#### **200 OK**
Oil data has been successfully retrieved.

**Example Response:**
```json
{
  "id": 1,
  "name": "Vampire Oil",
  "description": "Effective against vampires",
  "type": "oil",
  "ingredients": "Wolfsbane, Crow's Eye",
  "charges": 3,
  "_links": {
    "self": {
      "href": "http://localhost:8080/api/oils/1"
    }
  }
}
```
### **404 Not Found**
The specified oil ID does not exist.

**Example Response:**
```json
{
  "error": "Oil not found"
}
```

### **500 Internal Server Error**
Error reading oils file

**Example Response:**
```json
{
  "error": "Error processing oil data"
}
```

```json
{
  "error": "Error parsing oils data"
}
```

---

### Retrieve Oil's List

---

#### Method: **GET**

#### Path:
`api/oils`

#### Parameters:
| Name         | Type   | Required | Description               |
|--------------|--------|----------|---------------------------|
| `ingredient` | string | No       | Filter by ingredient name |

#### Request Example:
```http
GET api/oils HTTP/2.0
Host: localhost:8080
```

---
### **Responses:**

### **200 OK**
Oil data

**Example Response:**
```json
{
  "oilsList": [
    {
      "id": 1,
      "name": "Vampire Oil",
      "description": "Effective against vampires",
      "type": "oil",
      "ingredients": "Wolfsbane, Crow's Eye",
      "charges": 3,
      "_links": {
        "self": {
          "href": "http://localhost:8080/api/oils/1"
        }
      }
    }
  ],
  "_links": {
    "self": {
      "href": "http://api/localhost:8080/api/oils"
    }
  }
}
```

#### **404 Not Found**
Empty oil list

**Example Response:**
```json
{
  "error": "No content, empty oils list"
}
```

#### **500 Internal Server Error**
Error reading oils file

**Example Response:**
```json
{
  "error": "Error processing oils data"
}
```
---

### Create New Oil

---

#### Method: **POST**

##### Path:
`api/oils`

##### Request Body:
| Name          | Type   | Required | Description          |
|---------------|--------|----------|----------------------|
| `name`        | string | Yes      | Oil's name           |
| `description` | string | Yes      | Oil's description    |
| `ingredients` | string | Yes      | Required ingredients |
| `charges`     | number | Yes      | Number of charges    |

---

#### Request Example:
```http
POST api/oils HTTP/2.0
Host: localhost:8080
Content-Type: application/json

{
  "name": "Vampire Oil",
  "description": "Effective against vampires",
  "ingredients": "Wolfsbane, Crow's Eye",
  "charges": 3
}
```

#### **Responses:**

#### **201 Created**
Oil has been successfully created.

**Example Response:**
```json
{
  "message": "Oil created successfully",
  "oil": {
    "id": 1,
    "name": "Vampire Oil",
    "description": "Effective against vampires",
    "type": "oil",
    "ingredients": "Wolfsbane, Crow's Eye",
    "charges": 3
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

#### **400 Bad Request**
Invalid input

**Example Response:**
```json
{
  "error": "All fields are required"
}
```
#### **500 Internal Server Error**
Error saving oil

**Example Response:**
```json
{
  "error": "Error creating oil"
}
```

---

### Update Oil

---

#### Method: **PUT**

##### Path:
`api/oils/{id}`

##### Parameters:
| Name  | Type    | Required | Description                  |
|-------|---------|----------|------------------------------|
| `id`  | integer | Yes      | Unique identifier of the oil |

##### Request Body:
| Name          | Type   | Required | Description          |
|---------------|--------|----------|----------------------|
| `name`        | string | Yes      | Oil's name           |
| `description` | string | Yes      | Oil's description    |
| `ingredients` | string | Yes      | Required ingredients |
| `charges`     | number | Yes      | Number of charges    |

---

#### Request Example:
```http
PUT api/oils/1 HTTP/2.0
Host: localhost:8080
Content-Type: application/json
{
  "name": "Enhanced Vampire Oil",
  "description": "More effective against vampires",
  "ingredients": "Wolfsbane, Crow's Eye, Mandrake",
  "charges": 5
}
```

**Responses:**

#### **200 OK**
Oil has been successfully updated.

**Example Response**
```json
{
  "message": "Oil updated successfully",
  "oil": {
    "id": 1,
    "name": "Enhanced Vampire Oil",
    "description": "More effective against vampires",
    "type": "oil",
    "ingredients": "Wolfsbane, Crow's Eye, Mandrake",
    "charges": 5
  },
  "_links": {
    "self": {
      "href": "http://api/localhost:8080/api/oils/1"
    }
  }
}
```
#### **404 Not Found**
The specified oil ID does not exist.

**Example Response**
```json
{
  "error": "Oil not found"
}
```

#### **500 Internal Server Error**
Error updating oil

**Example Response**
```json
{
  "error": "Error updating oil"
}
```

---

### Patch Oil

---

#### Method: **PATCH**

##### Path:
`api/oils/{id}`

##### Parameters:
| Name  | Type    | Required | Description                  |
|-------|---------|----------|------------------------------|
| `id`  | integer | Yes      | Unique identifier of the oil |

##### Request Body:
| Name          | Type   | Required | Description          |
|---------------|--------|----------|----------------------|
| `name`        | string | No       | Oil's name           |
| `description` | string | No       | Oil's description    |
| `ingredients` | string | No       | Required ingredients |
| `charges`     | number | No       | Number of charges    |

---

#### Request Example:
```http
PATCH api/oils/1 HTTP/2.0
Host: localhost:8080
Content-Type: application/json

{
  "charges": 4
}

```

**Responses:**

#### **200 OK**
Oil has been successfully updated.

**Example Response**
```json
{
  "oil": {
    "id": 1,
    "name": "Vampire Oil",
    "description": "Effective against vampires",
    "type": "oil",
    "ingredients": "Wolfsbane, Crow's Eye",
    "charges": 4
  },
  "_links": {
    "self": {
      "href": "http://api/localhost:8080/api/oils/1"
    }
  }
}
```

#### **404 Not Found**
The specified oil ID does not exist.

**Example Response**
```json
{
  "error": "Oil not found"
}
```
#### **500 Internal Server Error**
Error updating oil
**Example Response**
```json
{
  "error": "Error updating oil"
}
```

---

### Delete Oil

---

#### Method: **DELETE**

##### Path:
`api/oils/{id}`

##### Parameters:
| Name  | Type    | Required | Description                  |
|-------|---------|----------|------------------------------|
| `id`  | integer | Yes      | Unique identifier of the oil |

#### Request Example:
```http
DELETE api/oils/1 HTTP/2.0
Host: localhost:8080
```

**Responses:**

#### **200 OK**
Oil has been successfully deleted.

**Example Response**
```json
{
  "message": "Oil deleted successfully",
  "_links": {
    "list": {
      "href": "http://api/localhost:8080/api/oils"
    }
  }
}
```

#### **404 Not Found**
The specified oil ID does not exist.

**Example Response**
```json
{
  "error": "Oil not found"
}
```
#### **500 Internal Server Error**
Error deleting oil

**Example Response:**
```json
{
  "error": "Error deleting oil"
}
```