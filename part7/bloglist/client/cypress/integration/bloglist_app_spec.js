describe('bloglist ', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset');
        const user = {
            name     : 'helloer mcdavid',
            username : 'greeter',
            password : '123'
        };
        cy.request('POST', 'http://localhost:3001/api/users/', user);
        cy.visit('http://localhost:3001');
    });

    it('page loads', function() {
        cy.contains('Log in');
    });

    it('login form can be opened', function() {
        cy.contains('Login').click();
    });

    describe('when logged in', function() {
        beforeEach(function() {
            cy.visit('http://localhost:3001');
            cy.contains('Log in');
            cy.get('#username').type('greeter');
            cy.get('#password').type('123');
            cy.contains('Login').click();
            cy.contains('logged in');
        });

        it('name of user is shown', function() {
            cy.contains('helloer mcdavid logged in');
        });

        it('signout works', function() {
            cy.contains('Log out').click();
            cy.contains('Log in');
        });

        describe('Manage blogposts', function() {
            beforeEach(function() {
                cy.contains('Create new post').click();
                cy.get('#title').type('Testing title');
                cy.get('#author').type('Testing author');
                cy.get('#url').type('Testing url');
                cy.contains('submit').click();
            });

            it('new blog can be created', function() {
                cy.contains('A new blog added: Testing title by Testing author');
            });

            it('like blogpost', function() {
                cy.get('.blog-link').click();
                cy.contains('Like').click();
                cy.contains('Liked post');
                cy.contains('1 likes');
            });

            it('remove blogpost', function() {
                cy.get('.blog-link').click();
                cy.contains('Remove').click();
                cy.contains('Post removed');
            });

            it('add comment', function() {
                cy.get('.blog-link').click();
                cy.get('#comment-input').type('Test comment');
                cy.contains('Add comment').click();
                cy.get('#comment-input').clear();
                cy.contains('Added comment');
                cy.contains('Test comment');
            });

            it('get user statistics after added blog', function() {
                cy.contains('Users').click();
                cy.contains('helloer mcdavid');
                cy.contains('1');
            });
        });
    });
});
