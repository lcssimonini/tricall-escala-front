var angular = require('angular');
var uiRouter = require('angular-ui-router');
var Chart = require('chart.js');

var URL_API = 'https://autoscalegenerator.herokuapp.com';

var appEscalaTricall = angular.module('appEscalaTricall', [uiRouter]);

appEscalaTricall.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state("login", {
        url: '/login',
        templateUrl: '../../pages/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
    });

    $stateProvider.state("esqueci-minha-senha", {
        url: '/esqueci-minha-senha',
        templateUrl: '../../pages/esqueci-minha-senha.html',
        controller: 'EsqueciMinhaSenhaController',
        controllerAs: 'vm'
    });

    $stateProvider.state("dashboard", {
        url: '/',
        templateUrl: '../../pages/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'vm'
    });

    $stateProvider.state("colaborador", {
        url: '/colaborador',
        templateUrl: '../../pages/colaborador.html',
        controller: 'ColaboradorController',
        controllerAs: 'vm'
    });

    $stateProvider.state("turno", {
        url: '/turno',
        templateUrl: '../../pages/turno.html',
        controller: 'TurnoController',
        controllerAs: 'vm'
    });

    $stateProvider.state("parametro-sistema", {
        url: '/parametro-sistema',
        templateUrl: '../../pages/parametro-sistema.html',
        controller: 'ParametroSistemaController',
        controllerAs: 'vm'
    });

    $stateProvider.state("escala", {
        url: '/escala',
        templateUrl: '../../pages/escala.html',
        controller: 'EscalaController',
        controllerAs: 'vm'
    });

    $stateProvider.state("geracao-escala", {
        url: '/geracao-escala',
        templateUrl: '../../pages/geracao-escala.html',
        controller: 'GeracaoEscalaController',
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

    service.auth = function (callback) {
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

appEscalaTricall.controller('SidebarController', ['$location', function ($location) {

    var vm = this;

    vm.isActive = function (viewLocation) {
        console.log($location.path());
        return (viewLocation === $location.path());
    };

}]);

appEscalaTricall.controller('DashboardController', [function () {

    var config = {
        type: 'line',
        data: {
            labels: [
                "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
                "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
                "20:00", "21:00", "22:00", "23:00"
            ],
            datasets: [
                {
                    label: "Colaboradores por Hora",
                    fillColor: "rgba(60,141,188,0.9)",
                    strokeColor: "rgba(60,141,188,0.8)",
                    pointColor: "#3b8bba",
                    pointStrokeColor: "rgba(60,141,188,1)",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(60,141,188,1)",
                    data: [2, 5, 9, 13, 17, 25, 30, 29, 28, 26, 25, 23, 21, 20, 15, 11, 8, 4]
                }
            ]
        },
        options: {
            showScale: true,
            scaleShowGridLines: false,
            scaleGridLineColor: "rgba(0,0,0,.05)",
            scaleGridLineWidth: 1,
            scaleShowHorizontalLines: true,
            scaleShowVerticalLines: true,
            bezierCurve: true,
            bezierCurveTension: 0.3,
            pointDot: false,
            pointDotRadius: 4,
            pointDotStrokeWidth: 1,
            pointHitDetectionRadius: 20,
            datasetStroke: true,
            datasetStrokeWidth: 2,
            datasetFill: true,
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
            maintainAspectRatio: true,
            responsive: true
        }
    };
    var areaChart = new Chart(document.getElementById("areaChart"), config);

}]);

appEscalaTricall.controller('TurnoController', [function () {

    var vm = this;
    vm.exibirFormulario = false;
    vm.itens = [];

    vm.getLista = function () {
        vm.itens = [
            {
                "id": 1,
                "titulo": "Manhã I",
                "entrada": "08:00",
                "saida": "14:00",
                "tipo": "NORMAL"
            },
            {
                "id": 2,
                "titulo": "Manhã II",
                "entrada": "10:00",
                "saida": "16:00",
                "tipo": "NORMAL"
            },
            {
                "id": 3,
                "titulo": "Manhã III",
                "entrada": "12:00",
                "saida": "18:00",
                "tipo": "NORMAL"
            },
            {
                "id": 4,
                "titulo": "Tarde I",
                "entrada": "14:00",
                "saida": "20:00",
                "tipo": "NORMAL"
            },
            {
                "id": 5,
                "titulo": "Tarde II",
                "entrada": "16:00",
                "saida": "22:00",
                "tipo": "NORMAL"
            },
            {
                "id": 6,
                "titulo": "Tarde III",
                "entrada": "18:00",
                "saida": "00:00",
                "tipo": "NORMAL"
            },
            {
                "id": 7,
                "titulo": "Noite I",
                "entrada": "20:00",
                "saida": "02:00",
                "tipo": "NORMAL"
            },
            {
                "id": 8,
                "titulo": "Noite II",
                "entrada": "22:00",
                "saida": "04:00",
                "tipo": "NORMAL"
            },
            {
                "id": 9,
                "titulo": "Noite III",
                "entrada": "00:00",
                "saida": "06:00",
                "tipo": "NORMAL"
            },
            {
                "id": 10,
                "titulo": "Manhã Reduzida",
                "entrada": "08:00",
                "saida": "12:00",
                "tipo": "REDUZIDO"
            },
            {
                "id": 11,
                "titulo": "Tarde Reduzida",
                "entrada": "12:00",
                "saida": "16:00",
                "tipo": "NORMAL"
            },
            {
                "id": 12,
                "titulo": "Noite Reduzida",
                "entrada": "16:00",
                "saida": "20:00",
                "tipo": "NORMAL"
            }
        ];
    };

    vm.lista = function () {
        vm.getLista();
        vm.exibirFormulario = false;
    };

    vm.remover = function (item) {
        vm.dados = item;
    };

    vm.formulario = function (item) {
        vm.dados = item;
        vm.exibirFormulario = true;
    };

    vm.salvar = function () {
        vm.lista();
    };

    vm.lista();

}]);

appEscalaTricall.controller('ColaboradorController', [function () {

    var vm = this;
    vm.exibirFormulario = false;
    vm.itens = [];

    vm.getLista = function () {
        vm.itens = [
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "matricula": "1234567",
                "email": "guto@gutorocha.com",
                "telefone": "(34) 990099003",
                "cargo": "COLABORADOR",
                "turno": null
            },
            {
                "id": 14,
                "nome": "Lucas Simonini",
                "matricula": "1234567",
                "email": "lucassimonini@softbox.com.br",
                "telefone": "(34) 3456-6789",
                "cargo": "COLABORADOR",
                "turno": null
            },
            {
                "id": 23,
                "nome": "Glauber Peixoto",
                "matricula": "1234567",
                "email": "augustosilva@softbox.com.br",
                "telefone": "(34) 2345-6789",
                "cargo": "COLABORADOR",
                "turno": null
            },
            {
                "id": 25,
                "nome": "Lucas Peixoto",
                "matricula": "1234567",
                "email": "augustosilva@softbox.com.br",
                "telefone": "(34) 2345-6789",
                "cargo": "COLABORADOR",
                "turno": null
            },
            {
                "id": 26,
                "nome": "Glauber Silva",
                "matricula": "1234567",
                "email": "augustosilva@softbox.com.br",
                "telefone": "(34) 2345-6789",
                "cargo": "COLABORADOR",
                "turno": null
            },
            {
                "id": 27,
                "nome": "Augusto Mendes",
                "matricula": "1234567",
                "email": "augustosilva@softbox.com.br",
                "telefone": "(34) 2345-1223",
                "cargo": "COLABORADOR",
                "turno": null
            }
        ];
    };

    vm.lista = function () {
        vm.getLista();
        vm.exibirFormulario = false;
    };

    vm.remover = function (item) {
        vm.dados = item;
    };

    vm.formulario = function (item) {
        vm.dados = item;
        vm.exibirFormulario = true;
    };

    vm.salvar = function () {
        vm.lista();
    };

    vm.lista();

}]);

appEscalaTricall.controller('ParametroSistemaController', [function () {

    var vm = this;
    vm.exibirFormulario = false;
    vm.itens = [];

    vm.getLista = function () {
        vm.itens = [
            {
                "chave": "MAXIMO_POSICOES",
                "valor": "60"
            },
            {
                "chave": "MAXIMO_POSICOES_ATIVAS",
                "valor": "25"
            },
            {
                "chave": "EMAIL_NOTIFICACAO",
                "valor": "notificacao@softbox.com.br"
            },
            {
                "chave": "API_AHGORA",
                "valor": "http://api.ahgora.com.br"
            }
        ];
    };

    vm.lista = function () {
        vm.getLista();
        vm.exibirFormulario = false;
    };

    vm.remover = function (item) {
        vm.dados = item;
    };

    vm.formulario = function (item) {
        vm.dados = item;
        vm.exibirFormulario = true;
    };

    vm.salvar = function () {
        vm.lista();
    };

    vm.lista();

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

appEscalaTricall.controller('EscalaController', [function () {

    var vm = this;
    vm.itens = [];

    vm.getLista = function () {
        vm.itens = [
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            },
            {
                "id": 12,
                "nome": "Augusto Rocha",
                "turno": "08:00 as 14:00",
                "d01": "FA",
                "d02": "T",
                "d03": "FE",
                "d04": "FO",
                "d05": "JR",
                "d06": "TR",
                "d07": "FA",
                "d08": "T",
                "d09": "FE",
                "d10": "FO",
                "d11": "JR",
                "d12": "TR",
                "d13": "FA",
                "d14": "T",
                "d15": "FE",
                "d16": "FO",
                "d17": "JR",
                "d18": "TR",
                "d19": "FA",
                "d20": "T",
                "d21": "FE",
                "d22": "FO",
                "d23": "JR",
                "d24": "TR",
                "d25": "FE",
                "d26": "FO",
                "d27": "JR",
                "d28": "TR",
                "d29": "T",
                "d30": "FE",
                "d31": "FO"
            }
        ];
    };

    vm.lista = function () {
        vm.getLista();
        vm.exibirFormulario = false;
    };

    vm.lista();

}]);

appEscalaTricall.controller('GeracaoEscalaController', [function() {

}]);
