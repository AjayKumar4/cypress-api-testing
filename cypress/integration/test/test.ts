describe('Products api', () => {
  context('GET /produtos', () => {
      it('should return a list with all products', () => {
          cy.request({
              method: 'GET',
              url: 'https://serverest.dev/produtos'
          })
              .should((response) => {
                  cy.log(JSON.stringify(response.body))
              });
      });
  });
});
