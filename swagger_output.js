const swagger_output = {
  "swagger": "2.0",
  "info": {
    "version": "1.0.0",
    "title": "TV SHOW REST API",
    "description": "This is a TV Show api"
  },
  "host": "localhost:9000",
  "basePath": "/api/",
  "schemes": [
    "http"
  ],
  "paths": {
    "/auth/login": {
      "post": {
        "tags": ['Authentication'],
        "description": "Here you can login into your account",
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "schema": {
              "type": "object",
              "properties": {
                "email": {
                  "example": "any"
                },
                "password": {
                  "example": "any"
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success"
          },
          "401": {
            "description": "Unauthorized"
          }
        }
      }
    },
    "/auth/register": {
      "post": {
        "tags": ['Authentication'],
        "description": "Here you can register",
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "schema": {
              "type": "object",
              "properties": {
                "name": {
                  "example": "any"
                },
                "email": {
                  "example": "any"
                },
                "password": {
                  "example": "any"
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success"
          },
          "400": {
            "description": "Bad Request"
          }
        }
      }
    },
    "/auth/logout": {
      "post": {
        "tags": ['Authentication'],
        "description": "This endpoint is to logout of your account for current device",
        "parameters": [
          {
            "name": "Authorization",
            "in": "header",
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "Success"
          },
          "401": {
            "description": "Unauthorized"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/auth/logoutall": {
      "post": {
        "tags": ['Authentication'],
        "description": "This endpoint is to logout of your account for all devices",
        "parameters": [
          {
            "name": "Authorization",
            "in": "header",
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "Success"
          },
          "401": {
            "description": "Unauthorized"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/super/addshow": {
      "post": {
        "tags": ['Super'],
        "description": "Here you can add a new tv show",
        "parameters": [
          {
            "name": "Authorization",
            "in": "header",
            "type": "string"
          },
          {
            "name": "body",
            "in": "body",
            "schema": {
              "type": "object",
              "properties": {
                "title": {
                  "example": "any"
                },
                "fullTitle": {
                  "example": "any"
                },
                "year": {
                  "example": "any"
                },
                "genre": {
                  "example": "any"
                },
                "image": {
                  "example": "any"
                },
                "crew": {
                  "example": "any"
                },
                "imdb": {
                  "example": "any"
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success"
          },
          "400": {
            "description": "Bad Request"
          },
          "401": {
            "description": "Unauthorized"
          }
        }
      }
    },
    "/super/removeshow/{showid}": {
      "delete": {
        "tags": ['Super'],
        "description": "To remove a show",
        "parameters": [
          {
            "name": "showid",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "Authorization",
            "in": "header",
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "Success"
          },
          "400": {
            "description": "Bad Request"
          },
          "401": {
            "description": "Unauthorized"
          },
          "404": {
            "description": "Not Found"
          }
        }
      }
    },
    "/super/addtofavorits": {
      "post": {
        "tags": ['Super'],
        "description": "To add a show to favorites",
        "parameters": [
          {
            "name": "Authorization",
            "in": "header",
            "type": "string"
          },
          {
            "name": "body",
            "in": "body",
            "schema": {
              "type": "object",
              "properties": {
                "showid": {
                  "example": "any"
                }
              }
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Created"
          },
          "400": {
            "description": "Bad Request"
          },
          "401": {
            "description": "Unauthorized"
          }
        }
      }
    },
    "/super/removefavorite": {
      "post": {
        "tags": ['Super'],
        "description": "remove the favorite show",
        "parameters": [
          {
            "name": "Authorization",
            "in": "header",
            "type": "string"
          },
          {
            "name": "body",
            "in": "body",
            "schema": {
              "type": "object",
              "properties": {
                "showid": {
                  "example": "any"
                }
              }
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Created"
          },
          "400": {
            "description": "Bad Request"
          },
          "401": {
            "description": "Unauthorized"
          }
        }
      }
    },
    "/super/favorites": {
      "get": {
        "tags": ['Super'],
        "description": "Returns favorite shows. Pagesize default is 50 which is maximum number for the pagesize. Sort parameter format is, *field:asc/desc. E.g 'year:asc' will sort the results by release date in ascending order. Available sort fileds are 'year' for release date, 'imdb' for imdb score, 'title' (alphabetical order) for tv show title of the show",
        "parameters": [
          {
            "name": "sort",
            "in": "query",
            "type": "string"
          },
          {
            "name": "pagesize",
            "in": "query",
            "type": "string"
          },
          {
            "name": "pageno",
            "in": "query",
            "type": "string"
          },
          {
            "name": "Authorization",
            "in": "header",
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "Success"
          },
          "400": {
            "description": "Bad Request"
          },
          "401": {
            "description": "Unauthorized"
          }
        }
      }
    },
    "/super/getshows": {
      "get": {
        "tags": ['Super'],
        "description": "Returns shows. Pagesize default is 50 which is maximum number for the pagesize. Sort parameter format is, *field:asc/desc. E.g 'year:asc' will sort the results by release date in ascending order. Available sort fileds are 'year' for release date, 'imdb' for imdb score, 'title' (alphabetical order) for tv show title of the show. Actor parameter can take more than one name seperated by comma. E.g 'Anthony Hopkins, Meryl Streep'",
        "parameters": [
          {
            "name": "year",
            "in": "query",
            "type": "string"
          },
          {
            "name": "genre",
            "in": "query",
            "type": "string"
          },
          {
            "name": "actor",
            "in": "query",
            "type": "string"
          },
          {
            "name": "sort",
            "in": "query",
            "type": "string"
          },
          {
            "name": "pagesize",
            "in": "query",
            "type": "string"
          },
          {
            "name": "pageno",
            "in": "query",
            "type": "string"
          },
          {
            "name": "Authorization",
            "in": "header",
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "Success"
          },
          "400": {
            "description": "Bad Request"
          },
          "401": {
            "description": "Unauthorized"
          }
        }
      }
    },
    "/super/recommends": {
      "get": {
        "tags": ['Super'],
        "description": "Returns recommended show according to favorite shows. Pagesize default is 50 which is maximum number for the pagesize. Sort parameter format is, *field:asc/desc. E.g 'year:asc' will sort the results by release date in ascending order. Available sort fileds are 'year' for release date, 'imdb' for imdb score, 'title' (alphabetical order) for tv show title of the show. Actor parameter can take more than one name seperated by comma. E.g 'Anthony Hopkins, Meryl Streep'",
        "parameters": [
          {
            "name": "release",
            "in": "query",
            "type": "string"
          },
          {
            "name": "genre",
            "in": "query",
            "type": "string"
          },
          {
            "name": "actor",
            "in": "query",
            "type": "string"
          },
          {
            "name": "sort",
            "in": "query",
            "type": "string"
          },
          {
            "name": "pagesize",
            "in": "query",
            "type": "string"
          },
          {
            "name": "pageno",
            "in": "query",
            "type": "string"
          },
          {
            "name": "Authorization",
            "in": "header",
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "Success"
          },
          "400": {
            "description": "Bad Request"
          },
          "401": {
            "description": "Unauthorized"
          }
        }
      }
    }
  }
}


module.exports = swagger_output