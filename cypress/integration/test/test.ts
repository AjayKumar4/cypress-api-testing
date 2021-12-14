before(() => {
    describe('Creates entity API', () => {
        context('POST /entities', () => {
            it('should create new entities item', () => {
                cy.fixture('entity').then((entity) => {
                    cy.request({
                        method: 'POST',
                        url: '/entities',
                        body: entity
                    })
                    .then((response) => {
                        expect(response.status).equal(201)
                        expect(response.body.name).equal(entity.name)
                        expect(response.body.entity_type).equal(entity.entity_type)
                        expect(response.body.description).equal(entity.description)
                        expect(response.body.is_verified).equal(entity.is_verified)
                        expect(response.body.department_id).equal(entity.department_id)
                        expect(response.body.entity_id.isNotNull)
                        const entityID = response.body.entity_id
                        cy.wrap(entityID).as('entityID');
                    });
                })
            });
        });
    });
})

describe('Update entity API', () => {
    context('PUT /entities/{{ entity_id }}', () => {
        it('should update entities item description of entity_id', () => {
            cy.get('@entityID').then(entityID => {
                const newEntity = { 
                    "description": "updated description of entity 1"
                } 

                cy.request({
                    method: 'PUT',
                    url: '/entities/' + entityID,
                    body: newEntity                      
                })
                .then((response) => {
                    cy.fixture('entity').then((entity) => {
                        expect(response.status).equal(200)
                        expect(response.body.name).equal(entity.name)
                        expect(response.body.entity_type).equal(entity.entity_type)
                        expect(response.body.description).equal(newEntity.description)
                        expect(response.body.is_verified).equal(entity.is_verified)
                        expect(response.body.department_id).equal(entity.department_id)
                        expect(response.body.entity_id).equal(entityID)
                        const newDescription = newEntity.description
                        cy.wrap(newDescription).as('newDescription');
                    });
                });
            });
        });

        it('should update all properties of entities item for entity_id', () => {
            cy.get('@entityID').then(entityID => {
                cy.fixture('updateEntity').then((updateEntity) => {
                    cy.request({
                        method: 'PUT',
                        url: '/entities/' + entityID,
                        body: updateEntity                      
                    })
                    .then((response) => {
                        expect(response.status).equal(200)
                        expect(response.body.name).equal(updateEntity.name)
                        expect(response.body.entity_type).equal(updateEntity.entity_type)
                        expect(response.body.description).equal(updateEntity.description)
                        expect(response.body.is_verified).equal(updateEntity.is_verified)
                        expect(response.body.department_id).equal(updateEntity.department_id)
                        expect(response.body.entity_id).equal(entityID)
                    });
                });
            });
        });

        it('should fail to update entities item description without entity_id', () => {
            const newEntity = { 
                "description": "updated description of entity 1"
            } 

            cy.request({
                method: 'PUT',
                url: '/entities/',
                body: newEntity                      
            })
            .then((response) => {
                expect(response.status).equal(500)
            });
        });
    });
});

describe('Get entity API', () => {
    context('GET /entities/{{ entity_id }}', () => {
        it('should get entities item with updated description of entity_id', () => {
            cy.get('@entityID').then(entityID => {
                cy.request({
                    method: 'GET',
                    url: '/entities/' + entityID
                })
                .then((response) => {
                    cy.fixture('entity').then((entity) => {
                        cy.get('@newDescription').then(newDescription => {
                            expect(response.status).equal(200)
                            expect(response.body.name).equal(entity.name)
                            expect(response.body.entity_type).equal(entity.entity_type)
                            expect(response.body.description).equal(newDescription)
                            expect(response.body.is_verified).equal(entity.is_verified)
                            expect(response.body.department_id).equal(entity.department_id)
                            expect(response.body.entity_id).equal(entityID)
                        });
                    });
                });
            });
        });

        it('should get entities item with all properties updated for entity_id', () => {
            cy.get('@entityID').then(entityID => {
                cy.request({
                    method: 'GET',
                    url: '/entities/' + entityID
                })
                .then((response) => {
                    cy.fixture('updateEntity').then((updateEntity) => {
                        expect(response.status).equal(200)
                        expect(response.body.name).equal(updateEntity.name)
                        expect(response.body.entity_type).equal(updateEntity.entity_type)
                        expect(response.body.description).equal(updateEntity.description)
                        expect(response.body.is_verified).equal(updateEntity.is_verified)
                        expect(response.body.department_id).equal(updateEntity.department_id)
                        expect(response.body.entity_id).equal(entityID)
                    });
                });
            });
        });
    });
});

after(() => {
    describe('Delete entity API,', () => {
        context('DELETE /entities/{{ entity_id }}', () => {
            it('should delete entities item of id entity_id', () => {
                cy.get('@entityID').then(entityID => {
                    cy.request({
                        method: 'DELETE',
                        url: '/entities/' + entityID,
                    })
                    .then((response) => {
                        expect(response.status).equal(204)
                    });
                });
            });
        });
    });
})
