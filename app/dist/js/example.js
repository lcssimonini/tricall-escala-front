var angular = require('angular');
var uiRouter = require('angular-ui-router');

var appEscalaTricall = angular.module('appEscalaTricall', [uiRouter]);

appEscalaTricall.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state("login", {
        url: '/',
        templateUrl: '../../login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
    });

    $stateProvider.state("contatos", {
        url: '/contatos',
        templateUrl: '../../contatos.html',
        controller: 'ContatosController',
        controllerAs: 'vm',
        views: {
            'logout': {
                templateUrl: '../../logout.html',
                controller: 'LogoutController',
                controllerAs: 'vm'
            },
            'contatos': {
                templateUrl: '../../contatos.html',
                controller: 'ContatosController',
                controllerAs: 'vm'
            }
        }
    });

    $stateProvider.state("esqueci-minha-senha", {
        url: '/esqueci-minha-senha',
        templateUrl: '../../esqueci-minha-senha.html',
        controller: 'EsqueciMinhaSenhaController',
        controllerAs: 'vm'
    });

}]);

appEscalaTricall.factory('AuthenticationService', ['$window', function ($window) {

    var usuarioTeste = {
        username: 'admin@admin.com.br',
        password: 'admin'
    };

    var tokenTeste = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
    var service = {};

    service.login = function (username, password, callback) {
        if (usuarioTeste.username === username && usuarioTeste.password === password) {
            $window.localStorage.setItem('appUsername', username);
            $window.localStorage.setItem('appToken', tokenTeste);

            if (!angular.isUndefined(callback)) {
                callback(true);
            }

        } else {

            if (!angular.isUndefined(callback)) {
                callback(false);
            }

        }
    };

    service.logout = function () {
        $window.localStorage.removeItem('appUsername');
        $window.localStorage.removeItem('appToken');
    };

    service.auth = function(callback) {
        if (usuarioTeste.username !== $window.localStorage.getItem('appUsername') && tokenTeste !== $window.localStorage.getItem('appToken')) {
            service.logout();

            if (!angular.isUndefined(callback)) {
                callback();
            }
        }
    };

    service.getUsuarioTeste = function () {
        return usuarioTeste;
    };

    return service;

}]);

appEscalaTricall.controller('LoginController', ['$location', 'AuthenticationService', function ($location, AuthenticationService) {

    var vm = this;

    vm.login = function () {

        vm.enviando = true;
        vm.enviandoMensagem = 'Enviando...';
        vm.erro = false;
        vm.erroMensagem = 'Usuário ou senha incorretos.';

        AuthenticationService.login(vm.username, vm.password, function (result) {
            if (result === true) {
                $location.path('/contatos');
            } else {
                vm.enviando = false;
                vm.erro = true;
            }
        });

    };

}]);

appEscalaTricall.controller('LogoutController', ['$location', 'AuthenticationService', function ($location, AuthenticationService) {

    var vm = this;

    vm.logout = function () {
        AuthenticationService.logout();
        $location.path('/');
    };

}]);

appEscalaTricall.controller('ContatosController', ['$location', 'AuthenticationService', function ($location, AuthenticationService) {

    AuthenticationService.auth(function () {
        $location.path('/');
    });

    var vm = this;

    vm.contatos = [
        {
            'id': 1,
            'nome': 'Jorge Mendes',
            'email': 'jorgemendes@email.com',
            'telefone': '(21) 22343454'
        }, {
            'id': 2,
            'nome': 'Luciana Borges',
            'email': 'lucianaborges@email.com',
            'telefone': '(21) 32343454'
        }, {
            'id': 3,
            'nome': 'Tiago Matos Silva',
            'email': 'tiagoms@email.com',
            'telefone': '(22) 35673151'
        }, {
            'id': 4,
            'nome': 'Camila Rocha',
            'email': 'camilarocha@email.com',
            'telefone': '(34) 20983151'
        }, {
            'id': 5,
            'nome': 'Fernando Portugal',
            'email': 'fportugal@email.com',
            'telefone': '(22) 998323151'
        }, {
            'id': 6,
            'nome': 'Camila Speroni',
            'email': 'camsper@email.com',
            'telefone': '(22) 35673151'
        }, {
            'id': 7,
            'nome': 'Lucia Rocha',
            'email': 'lulurocha@email.com',
            'telefone': '(34) 20983151'
        }, {
            'id': 8,
            'nome': 'Fernanda Matias Pereira',
            'email': 'fermatiaspereira@email.com',
            'telefone': '(22) 998323151'
        }
    ];

}]);

appEscalaTricall.controller('EsqueciMinhaSenhaController', ['AuthenticationService', function (AuthenticationService) {

    var vm = this;
    var usernameAtual = AuthenticationService.getUsuarioTeste();

    vm.esqueciminhasenha = function () {

        if (angular.equals({username: vm.username}, {username: usernameAtual.username})) {
            vm.alertType = "alert-success";
            vm.mensagem = "Você receberá uma nova senha em seu e-mail de cadastro.";
        } else {
            vm.alertType = "alert-warning";
            vm.mensagem = "Cadastro não encontrado em nosso sistema.";
        }

    }

}]);