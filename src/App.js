import React, { useState } from 'react';
import { Camera, CheckCircle, XCircle, Play, Square, FileText, Wrench, Users, Truck, Settings, LogOut, Eye, Plus, Edit2, Trash2, AlertTriangle } from 'lucide-react';

const SistemaControleViagem = () => {
  const [tela, setTela] = useState('login');
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState(null);
  const [viagemDetalhada, setViagemDetalhada] = useState(null);
  
  // Estados para dados
  const [credenciaisAdmin, setCredenciaisAdmin] = useState({
    usuario: 'admin',
    senha: 'admin123'
  });
  
  const [motoristas, setMotoristas] = useState([
    { id: 1, nome: 'João Silva', senha: '123456', status: 'ativo' },
    { id: 2, nome: 'Maria Santos', senha: '123456', status: 'ativo' }
  ]);
  
  const [veiculos, setVeiculos] = useState([
    { id: 1, prefixo: '1001', placa: 'ABC-1234', modelo: 'Mercedes-Benz O-500', status: 'ativo' },
    { id: 2, prefixo: '1002', placa: 'DEF-5678', modelo: 'Volvo B270F', status: 'ativo' }
  ]);
  
  const [cidades, setCidades] = useState([
    { id: 1, nome: 'São Paulo', uf: 'SP' },
    { id: 2, nome: 'Rio de Janeiro', uf: 'RJ' },
    { id: 3, nome: 'Belo Horizonte', uf: 'MG' },
    { id: 4, nome: 'Salvador', uf: 'BA' },
    { id: 5, nome: 'Brasília', uf: 'DF' },
    { id: 6, nome: 'Curitiba', uf: 'PR' },
    { id: 7, nome: 'Fortaleza', uf: 'CE' },
    { id: 8, nome: 'Recife', uf: 'PE' }
  ]);
  
  const [itensChecklist, setItensChecklist] = useState([
    { id: 1, nome: 'Pneus', obrigatorio: true },
    { id: 2, nome: 'Freios', obrigatorio: true },
    { id: 3, nome: 'Luzes', obrigatorio: true },
    { id: 4, nome: 'Portas', obrigatorio: true },
    { id: 5, nome: 'Interior', obrigatorio: true }
  ]);
  
  const [viagens, setViagens] = useState([]);
  
  // Estados do formulário de login
  const [loginData, setLoginData] = useState({ usuario: '', senha: '' });
  
  // Estados para formulários de cadastro
  const [novoMotorista, setNovoMotorista] = useState({ nome: '', senha: '' });
  const [novoVeiculo, setNovoVeiculo] = useState({ prefixo: '', placa: '', modelo: '' });
  const [novaCidade, setNovaCidade] = useState({ nome: '', uf: '' });
  const [novoItemChecklist, setNovoItemChecklist] = useState({ nome: '', obrigatorio: true });
  const [alterarCredenciais, setAlterarCredenciais] = useState({
    senhaAtual: '',
    novoUsuario: '',
    novaSenha: '',
    confirmarSenha: ''
  });
  
  // Estados para autocomplete
  const [sugestoesOrigem, setSugestoesOrigem] = useState([]);
  const [sugestoesDestino, setSugestoesDestino] = useState([]);
  const [mostrarSugestoesOrigem, setMostrarSugestoesOrigem] = useState(false);
  const [mostrarSugestoesDestino, setMostrarSugestoesDestino] = useState(false);
  
  // Estados da viagem
  const [etapa, setEtapa] = useState('inicial');
  const [dadosViagem, setDadosViagem] = useState({
    motorista: '',
    origem: '',
    destino: '',
    prefixo: '',
    kmInicial: '',
    kmFinal: '',
    diversidades: '',
    ordemServico: ''
  });
  
  const [checklist, setChecklist] = useState([
    { item: 'Pneus', status: 'pendente', foto: false, observacao: '', obrigatorio: true },
    { item: 'Freios', status: 'pendente', foto: false, observacao: '', obrigatorio: true },
    { item: 'Luzes', status: 'pendente', foto: false, observacao: '', obrigatorio: true },
    { item: 'Portas', status: 'pendente', foto: false, observacao: '', obrigatorio: true },
    { item: 'Interior', status: 'pendente', foto: false, observacao: '', obrigatorio: true }
  ]);

  // Funções de autenticação
  const fazerLogin = () => {
    if (loginData.usuario === credenciaisAdmin.usuario && loginData.senha === credenciaisAdmin.senha) {
      setUsuarioLogado('Administrador');
      setTipoUsuario('admin');
      setTela('dashboard-admin');
    } else {
      const motorista = motoristas.find(m => 
        m.nome.toLowerCase() === loginData.usuario.toLowerCase() && 
        m.senha === loginData.senha
      );
      if (motorista) {
        setUsuarioLogado(motorista.nome);
        setTipoUsuario('motorista');
        setTela('controle-viagem');
        setDadosViagem(prev => ({ ...prev, motorista: motorista.nome }));
        // Inicializar checklist com itens configurados
        const checklistInicial = itensChecklist.map(item => ({
          item: item.nome,
          status: 'pendente',
          foto: false,
          observacao: '',
          obrigatorio: item.obrigatorio
        }));
        setChecklist(checklistInicial);
      } else {
        alert('Usuário ou senha incorretos!');
      }
    }
  };

  const logout = () => {
    setUsuarioLogado(null);
    setTipoUsuario(null);
    setTela('login');
    setLoginData({ usuario: '', senha: '' });
    setEtapa('inicial');
    setViagemDetalhada(null);
    setDadosViagem({
      motorista: '',
      origem: '',
      destino: '',
      prefixo: '',
      kmInicial: '',
      kmFinal: '',
      diversidades: '',
      ordemServico: ''
    });
  };

  // Funções CRUD
  const adicionarMotorista = () => {
    if (novoMotorista.nome && novoMotorista.senha) {
      const novoId = Math.max(...motoristas.map(m => m.id), 0) + 1;
      setMotoristas([...motoristas, { 
        id: novoId, 
        ...novoMotorista, 
        status: 'ativo' 
      }]);
      setNovoMotorista({ nome: '', senha: '' });
    }
  };

  const adicionarVeiculo = () => {
    if (novoVeiculo.prefixo && novoVeiculo.placa && novoVeiculo.modelo) {
      const novoId = Math.max(...veiculos.map(v => v.id), 0) + 1;
      setVeiculos([...veiculos, { 
        id: novoId, 
        ...novoVeiculo, 
        status: 'ativo' 
      }]);
      setNovoVeiculo({ prefixo: '', placa: '', modelo: '' });
    }
  };

  const adicionarCidade = () => {
    if (novaCidade.nome && novaCidade.uf) {
      const novoId = Math.max(...cidades.map(c => c.id), 0) + 1;
      setCidades([...cidades, { 
        id: novoId, 
        ...novaCidade 
      }]);
      setNovaCidade({ nome: '', uf: '' });
    }
  };

  const adicionarItemChecklist = () => {
    if (novoItemChecklist.nome) {
      const novoId = Math.max(...itensChecklist.map(i => i.id), 0) + 1;
      setItensChecklist([...itensChecklist, { 
        id: novoId, 
        ...novoItemChecklist 
      }]);
      setNovoItemChecklist({ nome: '', obrigatorio: true });
    }
  };

  const removerMotorista = (id) => {
    setMotoristas(motoristas.filter(m => m.id !== id));
  };

  const removerVeiculo = (id) => {
    setVeiculos(veiculos.filter(v => v.id !== id));
  };

  const removerCidade = (id) => {
    setCidades(cidades.filter(c => c.id !== id));
  };

  const removerItemChecklist = (id) => {
    setItensChecklist(itensChecklist.filter(i => i.id !== id));
  };

  const toggleObrigatorioItem = (id) => {
    setItensChecklist(itensChecklist.map(item => 
      item.id === id ? { ...item, obrigatorio: !item.obrigatorio } : item
    ));
  };

  const alterarCredenciaisAdmin = () => {
    // Validar senha atual
    if (alterarCredenciais.senhaAtual !== credenciaisAdmin.senha) {
      alert('Senha atual incorreta!');
      return;
    }

    // Validar se os campos estão preenchidos
    if (!alterarCredenciais.novoUsuario || !alterarCredenciais.novaSenha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    // Validar confirmação de senha
    if (alterarCredenciais.novaSenha !== alterarCredenciais.confirmarSenha) {
      alert('A confirmação de senha não confere!');
      return;
    }

    // Validar tamanho mínimo da senha
    if (alterarCredenciais.novaSenha.length < 6) {
      alert('A nova senha deve ter pelo menos 6 caracteres!');
      return;
    }

    // Atualizar credenciais
    setCredenciaisAdmin({
      usuario: alterarCredenciais.novoUsuario,
      senha: alterarCredenciais.novaSenha
    });

    // Limpar formulário
    setAlterarCredenciais({
      senhaAtual: '',
      novoUsuario: '',
      novaSenha: '',
      confirmarSenha: ''
    });

    alert('Credenciais alteradas com sucesso!\n\nNovo usuário: ' + alterarCredenciais.novoUsuario);
  };

  // Funções de autocomplete
  const buscarCidades = (termo, tipo) => {
    if (termo.length < 2) {
      if (tipo === 'origem') {
        setSugestoesOrigem([]);
        setMostrarSugestoesOrigem(false);
      } else {
        setSugestoesDestino([]);
        setMostrarSugestoesDestino(false);
      }
      return;
    }

    const cidadesFiltradas = cidades.filter(cidade => 
      cidade.nome.toLowerCase().includes(termo.toLowerCase()) ||
      cidade.uf.toLowerCase().includes(termo.toLowerCase())
    );

    if (tipo === 'origem') {
      setSugestoesOrigem(cidadesFiltradas);
      setMostrarSugestoesOrigem(true);
    } else {
      setSugestoesDestino(cidadesFiltradas);
      setMostrarSugestoesDestino(true);
    }
  };

  const selecionarCidade = (cidade, tipo) => {
    const nomeCompleto = `${cidade.nome} - ${cidade.uf}`;
    handleInputChange(tipo, nomeCompleto);
    
    if (tipo === 'origem') {
      setMostrarSugestoesOrigem(false);
    } else {
      setMostrarSugestoesDestino(false);
    }
  };

  // Funções da viagem
  const handleInputChange = (field, value) => {
    setDadosViagem(prev => ({ ...prev, [field]: value }));
  };

  const handleChecklistChange = (index, field, value) => {
    setChecklist(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const iniciarViagem = () => {
    setEtapa('viagem');
  };

  const finalizarViagem = () => {
    setEtapa('finalizacao');
  };

  const concluirViagem = () => {
    // Validar se KM final é maior que inicial
    const kmInicial = parseFloat(dadosViagem.kmInicial);
    const kmFinal = parseFloat(dadosViagem.kmFinal);
    
    if (!dadosViagem.kmFinal || kmFinal <= kmInicial) {
      alert('ERRO: O KM final deve ser maior que o KM inicial!\n\n' +
            `KM Inicial: ${kmInicial}\n` +
            `KM Final: ${kmFinal || 'não informado'}\n\n` +
            'Por favor, corrija a quilometragem final.');
      return;
    }
    
    const novaViagem = {
      id: viagens.length + 1,
      ...dadosViagem,
      checklist: [...checklist],
      dataHora: new Date().toLocaleString(),
      kmPercorridos: kmFinal - kmInicial,
      temProblemas: checklist.some(item => item.status === 'nao-conforme') || 
                   dadosViagem.diversidades.trim() !== '' || 
                   dadosViagem.ordemServico.trim() !== ''
    };
    setViagens([...viagens, novaViagem]);
    setEtapa('concluida');
  };

  const novaViagem = () => {
    setEtapa('inicial');
    setDadosViagem({
      motorista: usuarioLogado,
      origem: '',
      destino: '',
      prefixo: '',
      kmInicial: '',
      kmFinal: '',
      diversidades: '',
      ordemServico: ''
    });
    // Criar checklist baseado nos itens configurados
    const checklistInicial = itensChecklist.map(item => ({
      item: item.nome,
      status: 'pendente',
      foto: false,
      observacao: '',
      obrigatorio: item.obrigatorio
    }));
    setChecklist(checklistInicial);
    // Limpar autocomplete
    setSugestoesOrigem([]);
    setSugestoesDestino([]);
    setMostrarSugestoesOrigem(false);
    setMostrarSugestoesDestino(false);
  };

  const podeIniciarViagem = () => {
    return dadosViagem.motorista && 
           dadosViagem.origem && 
           dadosViagem.destino && 
           dadosViagem.prefixo && 
           dadosViagem.kmInicial &&
           checklist.every(item => item.obrigatorio ? item.status !== 'pendente' : true);
  };

  const verDetalhesViagem = (viagem) => {
    setViagemDetalhada(viagem);
    setTela('detalhes-viagem');
  };

  // Tela de Login
  if (tela === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-2xl p-8">
          <div className="text-center mb-8">
            <Truck className="mx-auto text-blue-600 mb-4" size={48} />
            <h1 className="text-3xl font-bold text-gray-800">Sistema de Viagens</h1>
            <p className="text-gray-600 mt-2">Controle de Frota de Ônibus</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Usuário
              </label>
              <input
                type="text"
                value={loginData.usuario}
                onChange={(e) => setLoginData({...loginData, usuario: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Nome do usuário ou 'admin'"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                value={loginData.senha}
                onChange={(e) => setLoginData({...loginData, senha: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Senha"
              />
            </div>
            
            <button
              onClick={fazerLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Detalhes da Viagem
  if (tela === 'detalhes-viagem' && viagemDetalhada) {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setTela('dashboard-admin')}
                className="text-blue-600 hover:text-blue-700"
              >
                ← Voltar
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Detalhes da Viagem #{viagemDetalhada.id}</h1>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-1 text-red-600 hover:text-red-700"
            >
              <LogOut size={20} />
              <span>Sair</span>
            </button>
          </div>
        </header>

        <div className="max-w-4xl mx-auto p-6">
          {viagemDetalhada.temProblemas && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <AlertTriangle className="text-red-600 mr-2" size={20} />
                <span className="text-red-800 font-semibold">Viagem com Ocorrências</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Informações Básicas */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Informações da Viagem</h2>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Data/Hora:</span>
                    <p className="font-medium">{viagemDetalhada.dataHora}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Motorista:</span>
                    <p className="font-medium">{viagemDetalhada.motorista}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Origem:</span>
                    <p className="font-medium">{viagemDetalhada.origem}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Destino:</span>
                    <p className="font-medium">{viagemDetalhada.destino}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Veículo:</span>
                    <p className="font-medium">{viagemDetalhada.prefixo}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">KM Inicial:</span>
                    <p className="font-medium">{viagemDetalhada.kmInicial}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">KM Final:</span>
                    <p className="font-medium">{viagemDetalhada.kmFinal}</p>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Total Percorrido:</span>
                  <p className="font-medium text-lg">{viagemDetalhada.kmPercorridos} km</p>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Checklist de Verificação</h2>
              <div className="space-y-3">
                {viagemDetalhada.checklist.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span className="font-medium">{item.item}</span>
                    <div className="flex items-center space-x-2">
                      {item.status === 'conforme' && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                          Conforme
                        </span>
                      )}
                      {item.status === 'nao-conforme' && (
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                          Não Conforme
                        </span>
                      )}
                      {item.foto && (
                        <Camera className="text-blue-600" size={16} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ocorrências e Ordens de Serviço */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {viagemDetalhada.diversidades && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <FileText className="mr-2 text-orange-600" size={20} />
                  Diversidades da Viagem
                </h2>
                <div className="bg-orange-50 p-4 rounded border">
                  <p className="text-gray-800">{viagemDetalhada.diversidades}</p>
                </div>
              </div>
            )}

            {viagemDetalhada.ordemServico && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Wrench className="mr-2 text-red-600" size={20} />
                  Ordem de Serviço
                </h2>
                <div className="bg-red-50 p-4 rounded border">
                  <p className="text-gray-800">{viagemDetalhada.ordemServico}</p>
                </div>
              </div>
            )}
          </div>

          {/* Observações do Checklist */}
          {viagemDetalhada.checklist.some(item => item.observacao) && (
            <div className="mt-6 bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Observações do Checklist</h2>
              <div className="space-y-3">
                {viagemDetalhada.checklist
                  .filter(item => item.observacao)
                  .map((item, index) => (
                    <div key={index} className="bg-yellow-50 p-4 rounded border">
                      <p className="font-medium text-yellow-800">{item.item}:</p>
                      <p className="text-yellow-700">{item.observacao}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Dashboard do Administrador
  if (tela === 'dashboard-admin') {
    const viagensComProblemas = viagens.filter(v => v.temProblemas).length;
    
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Painel Administrativo</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Olá, {usuarioLogado}</span>
              <button
                onClick={logout}
                className="flex items-center space-x-1 text-red-600 hover:text-red-700"
              >
                <LogOut size={20} />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <Users className="text-blue-600 mr-3" size={32} />
                <div>
                  <h3 className="text-lg font-semibold">Motoristas</h3>
                  <p className="text-2xl font-bold text-blue-600">{motoristas.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <Truck className="text-green-600 mr-3" size={32} />
                <div>
                  <h3 className="text-lg font-semibold">Veículos</h3>
                  <p className="text-2xl font-bold text-green-600">{veiculos.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <Settings className="text-purple-600 mr-3" size={32} />
                <div>
                  <h3 className="text-lg font-semibold">Cidades</h3>
                  <p className="text-2xl font-bold text-purple-600">{cidades.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <CheckCircle className="text-indigo-600 mr-3" size={32} />
                <div>
                  <h3 className="text-lg font-semibold">Checklist</h3>
                  <p className="text-2xl font-bold text-indigo-600">{itensChecklist.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <FileText className="text-orange-600 mr-3" size={32} />
                <div>
                  <h3 className="text-lg font-semibold">Viagens</h3>
                  <p className="text-2xl font-bold text-orange-600">{viagens.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <AlertTriangle className="text-red-600 mr-3" size={32} />
                <div>
                  <h3 className="text-lg font-semibold">Ocorrências</h3>
                  <p className="text-2xl font-bold text-red-600">{viagensComProblemas}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Gerenciar Motoristas */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Users className="mr-2" size={24} />
                Gerenciar Motoristas
              </h2>
              
              <div className="mb-4 space-y-2">
                <input
                  type="text"
                  placeholder="Nome do motorista"
                  value={novoMotorista.nome}
                  onChange={(e) => setNovoMotorista({...novoMotorista, nome: e.target.value})}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="password"
                  placeholder="Senha"
                  value={novoMotorista.senha}
                  onChange={(e) => setNovoMotorista({...novoMotorista, senha: e.target.value})}
                  className="w-full p-2 border rounded"
                />
                <button
                  onClick={adicionarMotorista}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  <Plus className="inline mr-1" size={16} />
                  Adicionar Motorista
                </button>
              </div>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {motoristas.map(motorista => (
                  <div key={motorista.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <span className="font-medium">{motorista.nome}</span>
                      <span className="text-sm text-gray-500 ml-2">({motorista.status})</span>
                    </div>
                    <button
                      onClick={() => removerMotorista(motorista.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Gerenciar Veículos */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Truck className="mr-2" size={24} />
                Gerenciar Veículos
              </h2>
              
              <div className="mb-4 space-y-2">
                <input
                  type="text"
                  placeholder="Prefixo"
                  value={novoVeiculo.prefixo}
                  onChange={(e) => setNovoVeiculo({...novoVeiculo, prefixo: e.target.value})}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Placa"
                  value={novoVeiculo.placa}
                  onChange={(e) => setNovoVeiculo({...novoVeiculo, placa: e.target.value})}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Modelo"
                  value={novoVeiculo.modelo}
                  onChange={(e) => setNovoVeiculo({...novoVeiculo, modelo: e.target.value})}
                  className="w-full p-2 border rounded"
                />
                <button
                  onClick={adicionarVeiculo}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  <Plus className="inline mr-1" size={16} />
                  Adicionar Veículo
                </button>
              </div>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {veiculos.map(veiculo => (
                  <div key={veiculo.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <span className="font-medium">{veiculo.prefixo}</span>
                      <span className="text-sm text-gray-500 ml-2">{veiculo.placa}</span>
                      <div className="text-xs text-gray-400">{veiculo.modelo}</div>
                    </div>
                    <button
                      onClick={() => removerVeiculo(veiculo.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Gerenciar Cidades */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Settings className="mr-2" size={24} />
                Gerenciar Cidades
              </h2>
              
              <div className="mb-4 space-y-2">
                <input
                  type="text"
                  placeholder="Nome da cidade"
                  value={novaCidade.nome}
                  onChange={(e) => setNovaCidade({...novaCidade, nome: e.target.value})}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="UF (Ex: SP)"
                  value={novaCidade.uf}
                  onChange={(e) => setNovaCidade({...novaCidade, uf: e.target.value.toUpperCase()})}
                  className="w-full p-2 border rounded"
                  maxLength="2"
                />
                <button
                  onClick={adicionarCidade}
                  className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
                >
                  <Plus className="inline mr-1" size={16} />
                  Adicionar Cidade
                </button>
              </div>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {cidades.map(cidade => (
                  <div key={cidade.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <span className="font-medium">{cidade.nome}</span>
                      <span className="text-sm text-gray-500 ml-2">({cidade.uf})</span>
                    </div>
                    <button
                      onClick={() => removerCidade(cidade.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Alterar Credenciais do Administrador */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Settings className="mr-2 text-red-600" size={24} />
                Alterar Credenciais Admin
              </h2>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Senha Atual
                  </label>
                  <input
                    type="password"
                    placeholder="Digite sua senha atual"
                    value={alterarCredenciais.senhaAtual}
                    onChange={(e) => setAlterarCredenciais({...alterarCredenciais, senhaAtual: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Novo Usuário
                  </label>
                  <input
                    type="text"
                    placeholder="Novo nome de usuário"
                    value={alterarCredenciais.novoUsuario}
                    onChange={(e) => setAlterarCredenciais({...alterarCredenciais, novoUsuario: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nova Senha
                  </label>
                  <input
                    type="password"
                    placeholder="Nova senha (mín. 6 caracteres)"
                    value={alterarCredenciais.novaSenha}
                    onChange={(e) => setAlterarCredenciais({...alterarCredenciais, novaSenha: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmar Nova Senha
                  </label>
                  <input
                    type="password"
                    placeholder="Digite a nova senha novamente"
                    value={alterarCredenciais.confirmarSenha}
                    onChange={(e) => setAlterarCredenciais({...alterarCredenciais, confirmarSenha: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <button
                  onClick={alterarCredenciaisAdmin}
                  className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 font-medium"
                >
                  🔐 Alterar Credenciais
                </button>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm">
                  <p className="text-yellow-800 font-medium">⚠️ Usuário atual: {credenciaisAdmin.usuario}</p>
                  <p className="text-yellow-700 text-xs mt-1">Você precisará fazer login novamente após alterar</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Gerenciar Itens do Checklist */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <CheckCircle className="mr-2" size={24} />
                Gerenciar Checklist
              </h2>
              
              <div className="mb-4 space-y-2">
                <input
                  type="text"
                  placeholder="Nome do item (ex: Extintor)"
                  value={novoItemChecklist.nome}
                  onChange={(e) => setNovoItemChecklist({...novoItemChecklist, nome: e.target.value})}
                  className="w-full p-2 border rounded"
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="obrigatorio"
                    checked={novoItemChecklist.obrigatorio}
                    onChange={(e) => setNovoItemChecklist({...novoItemChecklist, obrigatorio: e.target.checked})}
                    className="rounded"
                  />
                  <label htmlFor="obrigatorio" className="text-sm text-gray-700">
                    Item obrigatório
                  </label>
                </div>
                <button
                  onClick={adicionarItemChecklist}
                  className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                >
                  <Plus className="inline mr-1" size={16} />
                  Adicionar Item
                </button>
              </div>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {itensChecklist.map(item => (
                  <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{item.nome}</span>
                      {item.obrigatorio ? (
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                          Obrigatório
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                          Opcional
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => toggleObrigatorioItem(item.id)}
                        className={`p-1 rounded text-xs ${
                          item.obrigatorio ? 'bg-red-200 hover:bg-red-300' : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                        title={item.obrigatorio ? 'Tornar opcional' : 'Tornar obrigatório'}
                      >
                        {item.obrigatorio ? '!' : '?'}
                      </button>
                      <button
                        onClick={() => removerItemChecklist(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Espaço para futuras funcionalidades */}
            <div className="bg-gray-50 rounded-lg shadow p-6 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Settings size={48} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">Espaço para</p>
                <p className="text-sm">futuras funcionalidades</p>
              </div>
            </div>
          </div>

          {/* Alterar Credenciais do Administrador */}
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Settings className="mr-2" size={24} />
                Alterar Credenciais do Administrador
              </h2>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Senha Atual
                  </label>
                  <input
                    type="password"
                    placeholder="Digite sua senha atual"
                    value={alterarCredenciais.senhaAtual}
                    onChange={(e) => setAlterarCredenciais({...alterarCredenciais, senhaAtual: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Novo Usuário
                  </label>
                  <input
                    type="text"
                    placeholder="Novo nome de usuário"
                    value={alterarCredenciais.novoUsuario}
                    onChange={(e) => setAlterarCredenciais({...alterarCredenciais, novoUsuario: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nova Senha
                  </label>
                  <input
                    type="password"
                    placeholder="Nova senha (mín. 6 caracteres)"
                    value={alterarCredenciais.novaSenha}
                    onChange={(e) => setAlterarCredenciais({...alterarCredenciais, novaSenha: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmar Nova Senha
                  </label>
                  <input
                    type="password"
                    placeholder="Digite a nova senha novamente"
                    value={alterarCredenciais.confirmarSenha}
                    onChange={(e) => setAlterarCredenciais({...alterarCredenciais, confirmarSenha: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <button
                  onClick={alterarCredenciaisAdmin}
                  className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 font-medium"
                >
                  🔐 Alterar Credenciais
                </button>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm">
                  <p className="text-yellow-800">
                    <strong>⚠️ Atenção:</strong> Após alterar as credenciais, você precisará fazer login novamente com os novos dados.
                  </p>
                  <p className="text-yellow-700 mt-1">
                    <strong>Credenciais atuais:</strong> {credenciaisAdmin.usuario}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Relatório Completo de Viagens */}
          {viagens.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <FileText className="mr-2" size={24} />
                Relatório Completo de Viagens
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left">Data/Hora</th>
                      <th className="px-4 py-2 text-left">Motorista</th>
                      <th className="px-4 py-2 text-left">Rota</th>
                      <th className="px-4 py-2 text-left">Veículo</th>
                      <th className="px-4 py-2 text-left">KM</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {viagens.map(viagem => (
                      <tr key={viagem.id} className={`border-t ${viagem.temProblemas ? 'bg-red-50' : ''}`}>
                        <td className="px-4 py-2">{viagem.dataHora}</td>
                        <td className="px-4 py-2">{viagem.motorista}</td>
                        <td className="px-4 py-2">{viagem.origem} → {viagem.destino}</td>
                        <td className="px-4 py-2">{viagem.prefixo}</td>
                        <td className="px-4 py-2">{viagem.kmPercorridos} km</td>
                        <td className="px-4 py-2">
                          {viagem.temProblemas ? (
                            <div className="flex items-center text-red-600">
                              <AlertTriangle size={16} className="mr-1" />
                              <span className="text-sm">Com Ocorrências</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-green-600">
                              <CheckCircle size={16} className="mr-1" />
                              <span className="text-sm">Normal</span>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() => verDetalhesViagem(viagem)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex items-center"
                          >
                            <Eye size={14} className="mr-1" />
                            Ver Detalhes
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Sistema de Controle de Viagem (para motoristas)
  if (tela === 'controle-viagem') {
    if (etapa === 'inicial') {
      return (
        <div className="min-h-screen bg-blue-50 p-4">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-blue-800">Sistema de Controle de Viagem</h1>
            <button
              onClick={logout}
              className="flex items-center space-x-1 text-red-600 hover:text-red-700"
            >
              <LogOut size={20} />
              <span>Sair</span>
            </button>
          </header>
          
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Motorista
                </label>
                <input
                  type="text"
                  value={dadosViagem.motorista}
                  disabled
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Origem
                  </label>
                  <input
                    type="text"
                    value={dadosViagem.origem}
                    onChange={(e) => {
                      handleInputChange('origem', e.target.value);
                      buscarCidades(e.target.value, 'origem');
                    }}
                    onBlur={() => setTimeout(() => setMostrarSugestoesOrigem(false), 300)}
                    onFocus={() => {
                      if (dadosViagem.origem.length >= 2) {
                        buscarCidades(dadosViagem.origem, 'origem');
                      }
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite ou selecione a origem"
                  />
                  {mostrarSugestoesOrigem && sugestoesOrigem.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                      {sugestoesOrigem.map(cidade => (
                        <button
                          key={cidade.id}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            selecionarCidade(cidade, 'origem');
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
                        >
                          <span className="font-medium">{cidade.nome}</span>
                          <span className="text-gray-500 ml-2">- {cidade.uf}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destino
                  </label>
                  <input
                    type="text"
                    value={dadosViagem.destino}
                    onChange={(e) => {
                      handleInputChange('destino', e.target.value);
                      buscarCidades(e.target.value, 'destino');
                    }}
                    onBlur={() => setTimeout(() => setMostrarSugestoesDestino(false), 300)}
                    onFocus={() => {
                      if (dadosViagem.destino.length >= 2) {
                        buscarCidades(dadosViagem.destino, 'destino');
                      }
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite ou selecione o destino"
                  />
                  {mostrarSugestoesDestino && sugestoesDestino.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                      {sugestoesDestino.map(cidade => (
                        <button
                          key={cidade.id}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            selecionarCidade(cidade, 'destino');
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
                        >
                          <span className="font-medium">{cidade.nome}</span>
                          <span className="text-gray-500 ml-2">- {cidade.uf}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prefixo do Ônibus
                  </label>
                  <select
                    value={dadosViagem.prefixo}
                    onChange={(e) => handleInputChange('prefixo', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecione</option>
                    {veiculos.filter(v => v.status === 'ativo').map(veiculo => (
                      <option key={veiculo.id} value={veiculo.prefixo}>
                        {veiculo.prefixo} - {veiculo.placa}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    KM Inicial
                  </label>
                  <input
                    type="number"
                    value={dadosViagem.kmInicial}
                    onChange={(e) => handleInputChange('kmInicial', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="KM"
                  />
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Checklist de Verificação
                </h3>
                <div className="space-y-3">
                  {checklist.map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{item.item}</span>
                          {item.obrigatorio ? (
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                              Obrigatório
                            </span>
                          ) : (
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                              Opcional
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleChecklistChange(index, 'status', 'conforme')}
                            className={`px-3 py-1 rounded text-sm font-medium ${
                              item.status === 'conforme' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            Conforme
                          </button>
                          <button
                            onClick={() => handleChecklistChange(index, 'status', 'nao-conforme')}
                            className={`px-3 py-1 rounded text-sm font-medium ${
                              item.status === 'nao-conforme' 
                                ? 'bg-red-500 text-white' 
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            Não Conforme
                          </button>
                          <button
                            onClick={() => handleChecklistChange(index, 'foto', !item.foto)}
                            className={`p-2 rounded ${
                              item.foto ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                            }`}
                            title="Tirar foto"
                          >
                            <Camera size={16} />
                          </button>
                        </div>
                      </div>
                      {item.status === 'nao-conforme' && (
                        <textarea
                          placeholder="Descreva o problema encontrado..."
                          value={item.observacao}
                          onChange={(e) => handleChecklistChange(index, 'observacao', e.target.value)}
                          className="w-full p-2 text-sm border border-gray-300 rounded resize-none"
                          rows="2"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={iniciarViagem}
                disabled={!podeIniciarViagem()}
                className={`w-full py-4 rounded-lg font-semibold text-white flex items-center justify-center space-x-2 ${
                  podeIniciarViagem() 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                <Play size={24} />
                <span>Iniciar Viagem</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (etapa === 'viagem') {
      return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="text-white" size={40} />
              </div>
              <h2 className="text-3xl font-bold text-green-600 mb-2">
                Boa Viagem!
              </h2>
              <p className="text-gray-600">
                Viagem de {dadosViagem.origem} para {dadosViagem.destino}
              </p>
              <p className="text-sm text-gray-500">
                Ônibus: {dadosViagem.prefixo} | Motorista: {dadosViagem.motorista}
              </p>
            </div>

            <button
              onClick={finalizarViagem}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-semibold flex items-center justify-center space-x-2"
            >
              <Square size={24} />
              <span>Finalizar Viagem</span>
            </button>
          </div>
        </div>
      );
    }

    if (etapa === 'finalizacao') {
      const kmInicial = parseFloat(dadosViagem.kmInicial);
      const kmFinal = parseFloat(dadosViagem.kmFinal);
      const kmInvalido = dadosViagem.kmFinal && kmFinal <= kmInicial;
      
      return (
        <div className="min-h-screen bg-orange-50 p-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
              Finalização da Viagem
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  KM Final
                </label>
                <input
                  type="number"
                  value={dadosViagem.kmFinal}
                  onChange={(e) => handleInputChange('kmFinal', e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:ring-2 ${
                    kmInvalido 
                      ? 'border-red-500 focus:ring-red-500 bg-red-50' 
                      : 'border-gray-300 focus:ring-orange-500'
                  }`}
                  placeholder="Quilometragem final"
                />
                {kmInvalido && (
                  <div className="mt-2 p-2 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
                    <strong>⚠️ Erro:</strong> KM final ({kmFinal}) deve ser maior que KM inicial ({kmInicial})
                  </div>
                )}
                <div className="mt-1 text-xs text-gray-500">
                  KM inicial da viagem: {dadosViagem.kmInicial}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="inline mr-2" size={16} />
                  Relatar Diversidades da Viagem
                </label>
                <textarea
                  value={dadosViagem.diversidades}
                  onChange={(e) => handleInputChange('diversidades', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 h-24"
                  placeholder="Descreva qualquer ocorrência durante a viagem..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Wrench className="inline mr-2" size={16} />
                  Ordem de Serviço
                </label>
                <textarea
                  value={dadosViagem.ordemServico}
                  onChange={(e) => handleInputChange('ordemServico', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 h-24"
                  placeholder="Serviços necessários no veículo..."
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">Resumo da Viagem:</h4>
                <div className="text-sm space-y-1">
                  <p><strong>Motorista:</strong> {dadosViagem.motorista}</p>
                  <p><strong>Rota:</strong> {dadosViagem.origem} → {dadosViagem.destino}</p>
                  <p><strong>Ônibus:</strong> {dadosViagem.prefixo}</p>
                  <p><strong>KM Inicial:</strong> {dadosViagem.kmInicial}</p>
                  {dadosViagem.kmFinal && (
                    <p><strong>KM Percorridos:</strong> {dadosViagem.kmFinal - dadosViagem.kmInicial} km</p>
                  )}
                </div>
              </div>

              <button
                onClick={concluirViagem}
                disabled={kmInvalido || !dadosViagem.kmFinal}
                className={`w-full py-4 rounded-lg font-semibold text-white ${
                  kmInvalido || !dadosViagem.kmFinal
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {kmInvalido ? 'Corrija o KM Final' : 'Concluir Viagem'}
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (etapa === 'concluida') {
      return (
        <div className="min-h-screen bg-blue-50 p-4">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-blue-800">Sistema de Controle de Viagem</h1>
            <button
              onClick={logout}
              className="flex items-center space-x-1 text-red-600 hover:text-red-700"
            >
              <LogOut size={20} />
              <span>Sair</span>
            </button>
          </header>
          
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-white" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Viagem Concluída!
            </h2>
            <p className="text-gray-600 mb-6">
              Todos os dados foram salvos com sucesso.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
              <h4 className="font-semibold text-gray-700 mb-2">Relatório Final:</h4>
              <div className="text-sm space-y-1">
                <p><strong>Motorista:</strong> {dadosViagem.motorista}</p>
                <p><strong>Rota:</strong> {dadosViagem.origem} → {dadosViagem.destino}</p>
                <p><strong>Ônibus:</strong> {dadosViagem.prefixo}</p>
                <p><strong>KM Percorridos:</strong> {dadosViagem.kmFinal - dadosViagem.kmInicial} km</p>
                {dadosViagem.diversidades && (
                  <p><strong>Diversidades:</strong> {dadosViagem.diversidades}</p>
                )}
                {dadosViagem.ordemServico && (
                  <p><strong>Ordem de Serviço:</strong> {dadosViagem.ordemServico}</p>
                )}
              </div>
            </div>

            <button
              onClick={novaViagem}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-semibold"
            >
              Nova Viagem
            </button>
          </div>
        </div>
      );
    }
  }

  return null;
};

export default SistemaControleViagem;
