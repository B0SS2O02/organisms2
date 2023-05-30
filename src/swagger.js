module.exports = {
    openapi: '3.0.0',
    info: {
        version: "1.0.0",
        title: "Bio ensiklopediya ",
        description: "Bio ensiklopediya API map"
    },
    server: [
        {
            url: `${process.env.MyIP}:${process.env.PORT}`,
            description: "Server"
        }
    ],
    components: {
    },
    paths: {
        '/api/organism': {
            get: {
                tags: ['Organisms'],
                summary: 'Hemme organismleri gormek ucin',
                responses: {
                    "200": {
                        description: 'ok',
                    }
                }
            },
            parameters: [
                {
                    in: "query",
                    name: 'page',
                    description: 'Sahypany sayla',
                    schema: {
                        type: 'integer',
                    }
                }, {
                    in: 'query',
                    name: "count",
                    description: "Bir sahypada gelmeli organismlerin sany",
                    schema: {
                        type: 'integer'
                    }
                }
            ]
        },
        '/api/organism/{id}': {
            get: {
                tags: ['Organisms'],
                summary: 'Organism barada informasiya',
                responses: {
                    "200": {
                        description: "ok"
                    }
                }

            },
            parameters: [{
                in: "path",
                name: 'id',
                "required": true,
                description: 'Organism ID',
                schema: {
                    type: 'integer'
                }
            }]

        },
        '/api/category': {
            get: {
                tags: ['Category'],
                summary: 'Hemme kategoriyany gormek ucin',
                responses: {
                    "200": {
                        description: 'ok',
                    }
                }
            },
            parameters: [
                {
                    in: "query",
                    name: 'page',
                    description: 'Sahypany sayla',
                    schema: {
                        type: 'integer',
                    }
                }, {
                    in: 'query',
                    name: "count",
                    description: "Bir sahypada gelmeli elementlerin sany",
                    schema: {
                        type: 'integer'
                    }
                }
            ]
        },
        '/api/category/{id}': {
            get: {
                tags: ['Category'],
                summary: 'Kategory barada informasiya',
                responses: {
                    "200": {
                        description: "ok"
                    }
                }

            },
            parameters: [{
                in: "path",
                name: 'id',
                "required": true,
                description: 'Kategory ID',
                schema: {
                    type: 'integer'
                }
            }]

        },
        '/api/language': {
            get: {
                tags: ['Language'],
                summary: 'Hemme language gormek ucin',
                responses: {
                    "200": {
                        description: 'ok',
                    }
                }
            },
            parameters: [
                
            ]
        },
        '/api/kindom': {
            get: {
                tags: ['Kindom'],
                summary: 'Hemme kindomyn gormek ucin',
                responses: {
                    "200": {
                        description: 'ok',
                    }
                }
            }
        },
        '/api/kindom/{id}': {
            get: {
                tags: ['Kindom'],
                summary: 'Kindom barada informasiya',
                responses: {
                    "200": {
                        description: "ok"
                    }
                }

            },
            parameters: [{
                in: "path",
                name: 'id',
                "required": true,
                description: 'Kategory ID',
                schema: {
                    type: 'integer'
                }
            }]

        },
        
    },
    definitions: {

    }
}