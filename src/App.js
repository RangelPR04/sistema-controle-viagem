import React, { useState } from 'react';
import { Camera, CheckCircle, XCircle, Play, Square, FileText, Wrench, Users, Truck, Settings, LogOut, Eye, Plus, Edit2, Trash2, AlertTriangle } from 'lucide-react';

const App = () => {
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
    { id: 2, nome: 'Maria Santos', senha: '123456', status: 'ativo' },
    { id: 3, nome: 'Pedro Oliveira', senha: '123456', status: 'ativo' }
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
    { id: 6, nome: 'Fortaleza', uf: 'CE' },
    { id: 7, nome: 'Curitiba', uf: 'PR' },
    { id: 8, nome: 'Recife', uf: 'PE' },
    { id: 9, nome: 'Porto Alegre', uf: 'RS' },
    { id: 10, nome: 'Manaus', uf: 'AM' }
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
            
            <div className="text-sm text-gray-500 text-center mt-4">
              <p><strong>Admin:</strong> admin / admin123</p>
              <p><strong>Motorista:</strong> João Silva / 123456</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ... resto do código igual ao anterior ...
  // (incluindo todas as outras telas: dashboard-admin, controle-viagem, etc.)

  return null;
};

export default App;
