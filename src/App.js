<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RTdigital - Gestão de Frota</title>
    
    <!-- PWA Meta Tags -->
    <meta name="description" content="Sistema completo de gestão de frota">
    <meta name="theme-color" content="#2196f3">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="RTdigital">
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            user-select: none;
        }

        .app-container {
            width: 100%;
            max-width: 400px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
            min-height: 600px;
            position: relative;
        }

        .screen {
            padding: 20px;
            min-height: 500px;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .logo {
            font-size: 32px;
            font-weight: bold;
            color: #2196f3;
            margin-bottom: 10px;
        }

        .subtitle {
            color: #666;
            font-size: 14px;
        }

        .card {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 15px;
            border: 1px solid #e9ecef;
        }

        .input-group {
            margin-bottom: 15px;
        }

        .input-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 500;
            color: #495057;
        }

        .input-group input, .input-group select, .input-group textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            font-size: 14px;
            transition: border-color 0.3s;
        }

        .input-group input:focus, .input-group select:focus, .input-group textarea:focus {
            outline: none;
            border-color: #2196f3;
        }

        .btn {
            width: 100%;
            padding: 12px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s;
            margin-bottom: 10px;
            touch-action: manipulation;
        }

        .btn:active {
            transform: scale(0.98);
        }

        .btn-primary {
            background: #2196f3;
            color: white;
        }

        .btn-primary:hover {
            background: #1976d2;
        }

        .btn-outline {
            background: transparent;
            color: #2196f3;
            border: 2px solid #2196f3;
        }

        .btn-outline:hover {
            background: #2196f3;
            color: white;
        }

        .btn-success {
            background: #28a745;
            color: white;
        }

        .btn-warning {
            background: #ffc107;
            color: #212529;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 20px;
        }

        .stat-card {
            background: white;
            padding: 20px;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .stat-number {
            font-size: 32px;
            font-weight: bold;
            color: #2196f3;
            margin-bottom: 5px;
        }

        .stat-label {
            font-size: 12px;
            color: #666;
        }

        .alert {
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            border-left: 5px solid;
        }

        .alert-warning {
            background: #fff3cd;
            border-left-color: #ffc107;
            color: #856404;
        }

        .alert-success {
            background: #d4edda;
            border-left-color: #28a745;
            color: #155724;
        }

        .alert-info {
            background: #cce7ff;
            border-left-color: #2196f3;
            color: #004085;
        }

        .navigation {
            background: #2196f3;
            display: flex;
            border-radius: 0 0 20px 20px;
        }

        .nav-item {
            flex: 1;
            padding: 15px 10px;
            text-align: center;
            color: white;
            cursor: pointer;
            transition: background 0.3s;
            font-size: 12px;
            touch-action: manipulation;
        }

        .nav-item:hover, .nav-item.active {
            background: rgba(255,255,255,0.2);
        }

        .vehicle-item, .user-item {
            background: white;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 10px;
            border-left: 5px solid #2196f3;
        }

        .vehicle-item.maintenance {
            border-left-color: #ffc107;
        }

        .vehicle-item.unavailable {
            border-left-color: #dc3545;
        }

        .checkbox-group {
            margin-bottom: 15px;
        }

        .checkbox-item {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            padding: 10px;
            background: #f8f9fa;
            border-radius: 8px;
            cursor: pointer;
            touch-action: manipulation;
        }

        .checkbox-item input[type="radio"] {
            margin-right: 10px;
        }

        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .modal-content {
            background: white;
            padding: 20px;
            border-radius: 12px;
            width: 90%;
            max-width: 400px;
            max-height: 80vh;
            overflow-y: auto;
        }

        .hidden {
            display: none;
        }

        .success-check {
            text-align: center;
            font-size: 64px;
            color: #28a745;
            margin: 20px 0;
        }

        .table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }

        .table th, .table td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #dee2e6;
            font-size: 14px;
        }

        .table th {
            background: #f8f9fa;
            font-weight: 600;
        }

        .badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 500;
        }

        .badge-success {
            background: #d4edda;
            color: #155724;
        }

        .badge-warning {
            background: #fff3cd;
            color: #856404;
        }

        .badge-danger {
            background: #f8d7da;
            color: #721c24;
        }

        .step-indicator {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
        }

        .step {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: #e9ecef;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 10px;
            font-weight: bold;
            color: #6c757d;
        }

        .step.active {
            background: #2196f3;
            color: white;
        }

        .step.completed {
            background: #28a745;
            color: white;
        }

        .install-prompt {
            position: fixed;
            bottom: 20px;
            left: 20px;
            right: 20px;
            background: #2196f3;
            color: white;
            padding: 15px;
            border-radius: 12px;
            text-align: center;
            z-index: 1001;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }

        .offline-indicator {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #dc3545;
            color: white;
            padding: 10px;
            text-align: center;
            font-size: 14px;
            z-index: 1002;
        }

        .pwa-status {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #28a745;
        }
    </style>
</head>
<body>
    <div class="app-container">
        <div class="pwa-status" title="RTdigital PWA Ativo"></div>
        
        <div id="offlineIndicator" class="offline-indicator hidden">
            📴 Modo Offline - Dados salvos localmente
        </div>

        <div id="installPrompt" class="install-prompt hidden">
            <div style="margin-bottom: 10px;">📱 Instalar RTdigital como aplicativo?</div>
            <button class="btn btn-success" onclick="installPWA()" style="margin: 5px; width: auto; padding: 8px 16px;">Instalar</button>
            <button class="btn btn-outline" onclick="dismissInstall()" style="margin: 5px; width: auto; padding: 8px 16px; color: white; border-color: white;">Depois</button>
        </div>

        <div id="loginScreen" class="screen">
            <div class="header">
                <div class="logo">RTdigital</div>
                <div class="subtitle">Sistema de Gestão de Frota</div>
            </div>
            
            <div class="card">
                <div class="input-group">
                    <label>Email</label>
                    <input type="email" id="loginEmail" value="admin@rtdigital.com" placeholder="Digite seu email">
                </div>
                <div class="input-group">
                    <label>Senha</label>
                    <input type="password" id="loginPassword" value="123456" placeholder="Digite sua senha">
                </div>
                <button class="btn btn-primary" onclick="login()">Entrar</button>
                
                <div style="margin-top: 20px; font-size: 12px; color: #666; text-align: center;">
                    <strong>Perfis disponíveis:</strong><br>
                    ADM, MOTORISTA, MANUTENCAO, GERENCIA
                </div>
            </div>

            <div class="alert alert-info">
                🌐 RTdigital PWA carregado - Funciona offline!
            </div>
        </div>

        <div id="adminHomeScreen" class="screen hidden">
            <div class="header">
                <div style="font-size: 24px; font-weight: bold;">Olá, <span id="userName"></span></div>
                <div class="subtitle">Painel Administrativo</div>
            </div>

            <div id="alertContainer"></div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-number" id="totalVehicles">5</div>
                    <div class="stat-label">Total de Veículos</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" id="availableVehicles">3</div>
                    <div class="stat-label">Disponíveis</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" id="totalUsers">4</div>
                    <div class="stat-label">Usuários</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" id="pendingOrders">2</div>
                    <div class="stat-label">OS Pendentes</div>
                </div>
            </div>

            <button class="btn btn-outline" onclick="logout()">Sair</button>
        </div>

        <div id="userManagementScreen" class="screen hidden">
            <div class="header">
                <div style="font-size: 20px; font-weight: bold;">Gerenciar Usuários</div>
            </div>

            <div id="usersList"></div>

            <button class="btn btn-primary" onclick="showAddUserModal()">+ Adicionar Usuário</button>
        </div>

        <div id="vehicleManagementScreen" class="screen hidden">
            <div class="header">
                <div style="font-size: 20px; font-weight: bold;">Gerenciar Veículos</div>
            </div>

            <div id="vehiclesList"></div>

            <button class="btn btn-primary" onclick="showAddVehicleModal()">+ Adicionar Veículo</button>
        </div>

        <div id="reportsScreen" class="screen hidden">
            <div class="header">
                <div style="font-size: 20px; font-weight: bold;">Relatórios</div>
            </div>

            <div class="card">
                <h3>Estatísticas Gerais</h3>
                <table class="table">
                    <tr><td>Total de Viagens</td><td>15</td></tr>
                    <tr><td>Viagens Concluídas</td><td>12</td></tr>
                    <tr><td>KM Total Rodados</td><td>2,450</td></tr>
                    <tr><td>Média KM/Viagem</td><td>163</td></tr>
                </table>
            </div>

            <div class="card">
                <h3>KM dos Veículos</h3>
                <table class="table">
                    <thead>
                        <tr><th>Veículo</th><th>KM Atual</th><th>Revisão</th><th>Status</th></tr>
                    </thead>
                    <tbody id="vehicleKmTable">
                        <tr>
                            <td>RTD-001</td>
                            <td>15,000</td>
                            <td>20,000</td>
                            <td><span class="badge badge-success">OK</span></td>
                        </tr>
                        <tr>
                            <td>RTD-002</td>
                            <td>25,000</td>
                            <td>25,000</td>
                            <td><span class="badge badge-danger">Revisão necessária</span></td>
                        </tr>
                        <tr>
                            <td>RTD-003</td>
                            <td>8,000</td>
                            <td>15,000</td>
                            <td><span class="badge badge-success">OK</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <button class="btn btn-success" onclick="generateExcelReport()">📊 Gerar Relatório Excel</button>
        </div>

        <div id="driverHomeScreen" class="screen hidden">
            <div class="header">
                <div style="font-size: 24px; font-weight: bold;">Olá, <span id="driverUserName"></span></div>
                <div class="subtitle">Motorista</div>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-number">8</div>
                    <div class="stat-label">Total de Viagens</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">3</div>
                    <div class="stat-label">Este Mês</div>
                </div>
            </div>

            <button class="btn btn-primary" onclick="showScreen('newTripScreen')">🚗 Nova Viagem</button>
            <button class="btn btn-outline" onclick="logout()">Sair</button>
        </div>

        <div id="newTripScreen" class="screen hidden">
            <div class="step-indicator">
                <div class="step active" id="step1">1</div>
                <div class="step" id="step2">2</div>
                <div class="step" id="step3">3</div>
            </div>

            <div id="tripStep1" class="trip-step">
                <div class="header">
                    <div style="font-size: 20px; font-weight: bold;">Nova Viagem - Dados</div>
                </div>

                <div class="card">
                    <div class="input-group">
                        <label>Veículo</label>
                        <select id="tripVehicle">
                            <option value="">Selecione um veículo</option>
                            <option value="1">RTD-001 - Fiat Fiorino</option>
                            <option value="3">RTD-003 - Ford Transit</option>
                        </select>
                    </div>

                    <div class="input-group">
                        <label>Origem</label>
                        <select id="tripOrigin">
                            <option value="">Selecione a origem</option>
                            <option value="1">São Paulo - SP</option>
                            <option value="2">Rio de Janeiro - RJ</option>
                            <option value="3">Belo Horizonte - MG</option>
                            <option value="4">Conselheiro Lafaiete - MG</option>
                        </select>
                    </div>

                    <div class="input-group">
                        <label>Destino</label>
                        <select id="tripDestination">
                            <option value="">Selecione o destino</option>
                            <option value="1">São Paulo - SP</option>
                            <option value="2">Rio de Janeiro - RJ</option>
                            <option value="3">Belo Horizonte - MG</option>
                            <option value="4">Conselheiro Lafaiete - MG</option>
                        </select>
                    </div>

                    <div class="input-group">
                        <label>KM Inicial</label>
                        <input type="number" id="tripKmInitial" placeholder="Digite o KM inicial">
                    </div>

                    <button class="btn btn-primary" onclick="nextTripStep()">Próximo: Check-in</button>
                </div>
            </div>

            <div id="tripStep2" class="trip-step hidden">
                <div class="header">
                    <div style="font-size: 20px; font-weight: bold;">Check-in do Veículo</div>
                </div>

                <div id="checkInItems"></div>

                <button class="btn btn-primary" onclick="nextTripStep()">Finalizar Check-in</button>
            </div>

            <div id="tripStep3" class="trip-step hidden">
                <div class="header">
                    <div style="font-size: 20px; font-weight: bold;">Confirmação</div>
                </div>

                <div class="card">
                    <div class="success-check">✅</div>
                    <h3 style="text-align: center;">Viagem Iniciada!</h3>
                    <div id="tripSummary"></div>
                    <div id="nonConformAlert" class="alert alert-warning hidden"></div>
                </div>

                <button class="btn btn-success" onclick="confirmTrip()">🏁 Boa Viagem!</button>
            </div>

            <button class="btn btn-outline" onclick="showScreen('driverHomeScreen')">Voltar</button>
        </div>

        <div id="maintenanceHomeScreen" class="screen hidden">
            <div class="header">
                <div style="font-size: 24px; font-weight: bold;">Olá, <span id="maintenanceUserName"></span></div>
                <div class="subtitle">Equipe de Manutenção</div>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-number">3</div>
                    <div class="stat-label">OS Pendentes</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">1</div>
                    <div class="stat-label">Em Andamento</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">2</div>
                    <div class="stat-label">Veículos em Manutenção</div>
                </div>
            </div>

            <button class="btn btn-primary" onclick="showScreen('serviceOrdersScreen')">🔧 Ver Ordens de Serviço</button>
            <button class="btn btn-outline" onclick="logout()">Sair</button>
        </div>

        <div id="serviceOrdersScreen" class="screen hidden">
            <div class="header">
                <div style="font-size: 20px; font-weight: bold;">Ordens de Serviço</div>
            </div>

            <div class="card">
                <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                    <button class="btn btn-primary" onclick="filterServiceOrders('PENDENTE')" style="width: auto; padding: 8px 12px; font-size: 12px;">Pendentes</button>
                    <button class="btn btn-outline" onclick="filterServiceOrders('EM_ANDAMENTO')" style="width: auto; padding: 8px 12px; font-size: 12px;">Em Andamento</button>
                    <button class="btn btn-outline" onclick="filterServiceOrders('CONCLUIDA')" style="width: auto; padding: 8px 12px; font-size: 12px;">Concluídas</button>
                </div>

                <div id="serviceOrdersList">
                    <div class="card">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                            <strong>OS #1</strong>
                            <span class="badge badge-warning">ALTA</span>
                        </div>
                        <p><strong>Veículo:</strong> RTD-002</p>
                        <p><strong>Descrição:</strong> Revisão dos 25.000 km</p>
                        <p><small>Criada em: 15/01/2024</small></p>
                        <button class="btn btn-primary" onclick="startServiceOrder(1)">Iniciar</button>
                    </div>
                </div>
            </div>

            <button class="btn btn-outline" onclick="showScreen('maintenanceHomeScreen')">Voltar</button>
        </div>

        <div id="managerHomeScreen" class="screen hidden">
            <div class="header">
                <div style="font-size: 24px; font-weight: bold;">Olá, <span id="managerUserName"></span></div>
                <div class="subtitle">Gerência</div>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-number">12</div>
                    <div class="stat-label">Viagens Este Mês</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">3</div>
                    <div class="stat-label">Motoristas Ativos</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">1,680</div>
                    <div class="stat-label">KM Este Mês</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">2</div>
                    <div class="stat-label">OS Pendentes</div>
                </div>
            </div>

            <button class="btn btn-primary" onclick="showScreen('reportsScreen')">📊 Ver Relatórios</button>
            <button class="btn btn-outline" onclick="logout()">Sair</button>
        </div>

        <div id="adminNavigation" class="navigation hidden">
            <div class="nav-item" onclick="showScreen('adminHomeScreen')">🏠 Home</div>
            <div class="nav-item" onclick="showScreen('userManagementScreen')">👥 Usuários</div>
            <div class="nav-item" onclick="showScreen('vehicleManagementScreen')">🚗 Veículos</div>
            <div class="nav-item" onclick="showScreen('reportsScreen')">📊 Relatórios</div>
        </div>

        <!-- Modais -->
        <div id="addUserModal" class="modal hidden">
            <div class="modal-content">
                <h3>Novo Usuário</h3>
                <div class="input-group">
                    <label>Nome</label>
                    <input type="text" id="newUserName" placeholder="Nome completo">
                </div>
                <div class="input-group">
                    <label>Email</label>
                    <input type="email" id="newUserEmail" placeholder="email@exemplo.com">
                </div>
                <div class="input-group">
                    <label>Senha</label>
                    <input type="password" id="newUserPassword" placeholder="Senha">
                </div>
                <div class="input-group">
                    <label>Perfil</label>
                    <select id="newUserProfile">
                        <option value="MOTORISTA">Motorista</option>
                        <option value="MANUTENCAO">Manutenção</option>
                        <option value="GERENCIA">Gerência</option>
                        <option value="ADM">Administrador</option>
                    </select>
                </div>
                <button class="btn btn-primary" onclick="addUser()">Salvar</button>
                <button class="btn btn-outline" onclick="hideModal('addUserModal')">Cancelar</button>
            </div>
        </div>

        <div id="addVehicleModal" class="modal hidden">
            <div class="modal-content">
                <h3>Novo Veículo</h3>
                <div class="input-group">
                    <label>Prefixo</label>
                    <input type="text" id="newVehiclePrefix" placeholder="RTD-004">
                </div>
                <div class="input-group">
                    <label>Modelo</label>
                    <input type="text" id="newVehicleModel" placeholder="Fiat Strada">
                </div>
                <div class="input-group">
                    <label>Placa</label>
                    <input type="text" id="newVehiclePlate" placeholder="ABC-1234">
                </div>
                <div class="input-group">
                    <label>Ano</label>
                    <input type="number" id="newVehicleYear" placeholder="2022">
                </div>
                <div class="input-group">
                    <label>KM para Revisão</label>
                    <input type="number" id="newVehicleRevision" placeholder="10000">
                </div>
                <button class="btn btn-primary" onclick="addVehicle()">Salvar</button>
                <button class="btn btn-outline" onclick="hideModal('addVehicleModal')">Cancelar</button>
            </div>
        </div>
    </div>

    <script>
        // Dados mockados
        let currentUser = null;
        let currentTripStep = 1;
        let deferredPrompt;

        const users = [
            { id: 1, name: 'Administrador', email: 'admin@rtdigital.com', password: '123456', profile: 'ADM' },
            { id: 2, name: 'João Silva', email: 'joao@rtdigital.com', password: '123456', profile: 'MOTORISTA' },
            { id: 3, name: 'Pedro Manutenção', email: 'pedro@rtdigital.com', password: '123456', profile: 'MANUTENCAO' },
            { id: 4, name: 'Maria Gerente', email: 'maria@rtdigital.com', password: '123456', profile: 'GERENCIA' }
        ];

        const vehicles = [
            { id: 1, prefix: 'RTD-001', model: 'Fiat Fiorino', plate: 'ABC-1234', year: 2020, kmCurrent: 15000, kmRevision: 20000, status: 'DISPONIVEL' },
            { id: 2, prefix: 'RTD-002', model: 'VW Saveiro', plate: 'DEF-5678', year: 2021, kmCurrent: 25000, kmRevision: 25000, status: 'MANUTENCAO' },
            { id: 3, prefix: 'RTD-003', model: 'Ford Transit', plate: 'GHI-9012', year: 2019, kmCurrent: 8000, kmRevision: 15000, status: 'DISPONIVEL' }
        ];

        const checkInItems = [
            { id: 1, description: 'Nível de óleo do motor' },
            { id: 2, description: 'Pressão dos pneus' },
            { id: 3, description: 'Funcionamento dos faróis' },
            { id: 4, description: 'Funcionamento das lanternas' },
            { id: 5, description: 'Documentação do veículo' }
        ];

        // PWA Installation
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            setTimeout(() => {
                document.getElementById('installPrompt').classList.remove('hidden');
            }, 3000);
        });

        function installPWA() {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        alert('RTdigital instalado com sucesso!');
                    }
                    deferredPrompt = null;
                    document.getElementById('installPrompt').classList.add('hidden');
                });
            }
        }

        function dismissInstall() {
            document.getElementById('installPrompt').classList.add('hidden');
        }

        // Connection Status
        function updateConnectionStatus() {
            const offlineIndicator = document.getElementById('offlineIndicator');
            
            if (navigator.onLine) {
                offlineIndicator.classList.add('hidden');
            } else {
                offlineIndicator.classList.remove('hidden');
            }
        }

        window.addEventListener('online', updateConnectionStatus);
        window.addEventListener('offline', updateConnectionStatus);

        function login() {
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                currentUser = user;
                showUserScreen();
                alert('Login realizado com sucesso!');
            } else {
                alert('Email ou senha inválidos!');
            }
        }

        function logout() {
            currentUser = null;
            showScreen('loginScreen');
            hideNavigation();
        }

        function showUserScreen() {
            switch (currentUser.profile) {
                case 'ADM':
                    showScreen('adminHomeScreen');
                    showNavigation();
                    document.getElementById('userName').textContent = currentUser.name;
                    updateAdminStats();
                    checkRevisionAlerts();
                    break;
                case 'MOTORISTA':
                    showScreen('driverHomeScreen');
                    document.getElementById('driverUserName').textContent = currentUser.name;
                    break;
                case 'MANUTENCAO':
                    showScreen('maintenanceHomeScreen');
                    document.getElementById('maintenanceUserName').textContent = currentUser.name;
                    break;
                case 'GERENCIA':
                    showScreen('managerHomeScreen');
                    document.getElementById('managerUserName').textContent = currentUser.name;
                    break;
            }
        }

        function showScreen(screenId) {
            const screens = document.querySelectorAll('.screen');
            screens.forEach(screen => screen.classList.add('hidden'));
            
            document.getElementById(screenId).classList.remove('hidden');

            if (screenId === 'userManagementScreen') {
                loadUsers();
            } else if (screenId === 'vehicleManagementScreen') {
                loadVehicles();
            }
        }

        function showNavigation() {
            document.getElementById('adminNavigation').classList.remove('hidden');
        }

        function hideNavigation() {
            document.getElementById('adminNavigation').classList.add('hidden');
        }

        function updateAdminStats() {
            const availableVehicles = vehicles.filter(v => v.status === 'DISPONIVEL').length;
            document.getElementById('totalVehicles').textContent = vehicles.length;
            document.getElementById('availableVehicles').textContent = availableVehicles;
            document.getElementById('totalUsers').textContent = users.length;
        }

        function checkRevisionAlerts() {
            const vehiclesNeedingRevision = vehicles.filter(v => v.kmCurrent >= v.kmRevision);
            const alertContainer = document.getElementById('alertContainer');
            
            if (vehiclesNeedingRevision.length > 0) {
                const vehicleList = vehiclesNeedingRevision.map(v => v.prefix).join(', ');
                alertContainer.innerHTML = '<div class="alert alert-warning">⚠️ <strong>Atenção:</strong> ' + vehiclesNeedingRevision.length + ' veículo(s) precisam de revisão: ' + vehicleList + '</div>';
            } else {
                alertContainer.innerHTML = '';
            }
        }

        function loadUsers() {
            const usersList = document.getElementById('usersList');
            usersList.innerHTML = '';

            users.forEach(user => {
                const profileColors = {
                    'ADM': '#dc3545',
                    'GERENCIA': '#2196f3', 
                    'MOTORISTA': '#28a745',
                    'MANUTENCAO': '#ffc107'
                };

                const userDiv = document.createElement('div');
                userDiv.className = 'user-item';
                userDiv.innerHTML = '<div style="display: flex; justify-content: space-between; align-items: center;"><div><strong>' + user.name + '</strong><br><small>' + user.email + '</small></div><span class="badge" style="background: ' + profileColors[user.profile] + '; color: white;">' + user.profile + '</span></div>';
                usersList.appendChild(userDiv);
            });
        }

        function loadVehicles() {
            const vehiclesList = document.getElementById('vehiclesList');
            vehiclesList.innerHTML = '';

            vehicles.forEach(vehicle => {
                const needsRevision = vehicle.kmCurrent >= vehicle.kmRevision;
                const statusClass = vehicle.status === 'MANUTENCAO' ? 'maintenance' : vehicle.status === 'INDISPONIVEL' ? 'unavailable' : '';

                const vehicleDiv = document.createElement('div');
                vehicleDiv.className = 'vehicle-item ' + statusClass;
                vehicleDiv.innerHTML = '<div style="display: flex; justify-content: space-between; align-items: center;"><div><strong>' + vehicle.prefix + '</strong> - ' + vehicle.model + '<br><small>Placa: ' + vehicle.plate + ' | KM: ' + vehicle.kmCurrent.toLocaleString() + '</small><br><small>Revisão em: ' + vehicle.kmRevision.toLocaleString() + ' km</small>' + (needsRevision ? '<br><span style="color: #dc3545; font-weight: bold;">⚠️ Revisão necessária!</span>' : '') + '</div><span class="badge badge-' + (vehicle.status === 'DISPONIVEL' ? 'success' : vehicle.status === 'MANUTENCAO' ? 'warning' : 'danger') + '">' + vehicle.status + '</span></div>';
                vehiclesList.appendChild(vehicleDiv);
            });
        }

        function nextTripStep() {
            if (currentTripStep === 1) {
                const vehicle = document.getElementById('tripVehicle').value;
                const origin = document.getElementById('tripOrigin').value;
                const destination = document.getElementById('tripDestination').value;
                const kmInitial = document.getElementById('tripKmInitial').value;

                if (!vehicle || !origin || !destination || !kmInitial) {
                    alert('Preencha todos os campos!');
                    return;
                }

                if (origin === destination) {
                    alert('Origem e destino devem ser diferentes!');
                    return;
                }

                currentTripStep = 2;
                document.getElementById('tripStep1').classList.add('hidden');
                document.getElementById('tripStep2').classList.remove('hidden');
                document.getElementById('step1').classList.remove('active');
                document.getElementById('step1').classList.add('completed');
                document.getElementById('step2').classList.add('active');
                
                loadCheckInItems();

            } else if (currentTripStep === 2) {
                currentTripStep = 3;
                document.getElementById('tripStep2').classList.add('hidden');
                document.getElementById('tripStep3').classList.remove('hidden');
                document.getElementById('step2').classList.remove('active');
                document.getElementById('step2').classList.add('completed');
                document.getElementById('step3').classList.add('active');
                
                showTripSummary();
            }
        }

        function loadCheckInItems() {
            const checkInContainer = document.getElementById('checkInItems');
            checkInContainer.innerHTML = '';

            checkInItems.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'card';
                itemDiv.innerHTML = '<h4>' + item.description + '</h4><div class="checkbox-group"><div class="checkbox-item"><input type="radio" name="item_' + item.id + '" value="CONFORME" checked><label>✅ Conforme</label></div><div class="checkbox-item"><input type="radio" name="item_' + item.id + '" value="NAO_CONFORME"><label>❌ Não Conforme</label></div></div><div class="input-group hidden" id="obs_' + item.id + '"><label>Observação</label><textarea placeholder="Descreva o problema"></textarea></div>';
                checkInContainer.appendChild(itemDiv);
            });

            document.querySelectorAll('input[type="radio"]').forEach(radio => {
                radio.addEventListener('change', function() {
                    const itemId = this.name.split('_')[1];
                    const obsDiv = document.getElementById('obs_' + itemId);
                    if (this.value === 'NAO_CONFORME') {
                        obsDiv.classList.remove('hidden');
                    } else {
                        obsDiv.classList.add('hidden');
                    }
                });
            });
        }

        function showTripSummary() {
            const vehicle = vehicles.find(v => v.id == document.getElementById('tripVehicle').value);
            const nonConformItems = checkNonConformItems();

            document.getElementById('tripSummary').innerHTML = '<p><strong>Veículo:</strong> ' + vehicle.prefix + '</p><p><strong>KM Inicial:</strong> ' + document.getElementById('tripKmInitial').value + '</p><p><strong>Check-in:</strong> Realizado com sucesso</p>';

            if (nonConformItems.length > 0) {
                document.getElementById('nonConformAlert').classList.remove('hidden');
                document.getElementById('nonConformAlert').innerHTML = '⚠️ ' + nonConformItems.length + ' item(ns) não conforme(s) encontrado(s). Ordens de serviço serão geradas automaticamente.';
            }
        }

        function checkNonConformItems() {
            const nonConformItems = [];
            checkInItems.forEach(item => {
                const selectedRadio = document.querySelector('input[name="item_' + item.id + '"]:checked');
                if (selectedRadio && selectedRadio.value === 'NAO_CONFORME') {
                    nonConformItems.push(item);
                }
            });
            return nonConformItems;
        }

        function confirmTrip() {
            alert('Boa viagem! Viagem iniciada com sucesso.');
            showScreen('driverHomeScreen');
            
            currentTripStep = 1;
            document.getElementById('tripStep2').classList.add('hidden');
            document.getElementById('tripStep3').classList.add('hidden');
            document.getElementById('tripStep1').classList.remove('hidden');
            document.getElementById('step1').className = 'step active';
            document.getElementById('step2').className = 'step';
            document.getElementById('step3').className = 'step';
        }

        function filterServiceOrders(status) {
            alert('Filtrando ordens de serviço: ' + status);
        }

        function startServiceOrder(orderId) {
            alert('Iniciando ordem de serviço #' + orderId);
        }

        function showModal(modalId) {
            document.getElementById(modalId).classList.remove('hidden');
        }

        function hideModal(modalId) {
            document.getElementById(modalId).classList.add('hidden');
        }

        function showAddUserModal() {
            showModal('addUserModal');
        }

        function showAddVehicleModal() {
            showModal('addVehicleModal');
        }

        function addUser() {
            const name = document.getElementById('newUserName').value;
            const email = document.getElementById('newUserEmail').value;
            const password = document.getElementById('newUserPassword').value;
            const profile = document.getElementById('newUserProfile').value;

            if (!name || !email || !password) {
                alert('Preencha todos os campos!');
                return;
            }

            const newUser = {
                id: users.length + 1,
                name,
                email,
                password,
                profile
            };

            users.push(newUser);
            hideModal('addUserModal');
            loadUsers();
            updateAdminStats();
            alert('Usuário adicionado com sucesso!');

            document.getElementById('newUserName').value = '';
            document.getElementById('newUserEmail').value = '';
            document.getElementById('newUserPassword').value = '';
        }

        function addVehicle() {
            const prefix = document.getElementById('newVehiclePrefix').value;
            const model = document.getElementById('newVehicleModel').value;
            const plate = document.getElementById('newVehiclePlate').value;
            const year = document.getElementById('newVehicleYear').value;
            const revision = document.getElementById('newVehicleRevision').value;

            if (!prefix || !model || !plate || !revision) {
                alert('Preencha todos os campos obrigatórios!');
                return;
            }

            const newVehicle = {
                id: vehicles.length + 1,
                prefix,
                model,
                plate,
                year: parseInt(year) || null,
                kmCurrent: 0,
                kmRevision: parseInt(revision),
                status: 'DISPONIVEL'
            };

            vehicles.push(newVehicle);
            hideModal('addVehicleModal');
            loadVehicles();
            updateAdminStats();
            alert('Veículo adicionado com sucesso!');

            document.getElementById('newVehiclePrefix').value = '';
            document.getElementById('newVehicleModel').value = '';
            document.getElementById('newVehiclePlate').value = '';
            document.getElementById('newVehicleYear').value = '';
            document.getElementById('newVehicleRevision').value = '';
        }

        function generateExcelReport() {
            alert('Relatório Excel gerado com sucesso! (Funcionalidade simulada)');
        }

        // Inicialização
        document.addEventListener('DOMContentLoaded', function() {
            updateConnectionStatus();
            console.log('RTdigital PWA inicializado com sucesso!');
        });

        // Service Worker simples
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                const swCode = `
                    self.addEventListener('install', function(event) {
                        console.log('RTdigital Service Worker instalado');
                    });
                    
                    self.addEventListener('fetch', function(event) {
                        event.respondWith(fetch(event.request));
                    });
                `;
                
                const blob = new Blob([swCode], { type: 'application/javascript' });
                const swUrl = URL.createObjectURL(blob);
                
                navigator.serviceWorker.register(swUrl).then(function(registration) {
                    console.log('RTdigital Service Worker registrado com sucesso');
                }).catch(function(error) {
                    console.log('Erro ao registrar Service Worker:', error);
                });
            });
        }
    </script>
</body>
</html>
