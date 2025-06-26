import React, { useState } from 'react';
import { Camera, CheckCircle, XCircle, Play, Square, FileText, Wrench, Users, Truck, Settings, LogOut, Eye, Plus, Edit2, Trash2, AlertTriangle } from 'lucide-react';
import './index.css'; // Mantém o CSS original

const App = () => {
  const [tela, setTela] = useState('login');
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState(null);
  const [viagemDetalhada, setViagemDetalhada] = useState(null);
  
  // Estados para dados (baseados nos seus dados originais)
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
  
  // Adaptando suas cidades originais
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

  // Funções de autenticação (usando sua lógica original adaptada)
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

  // Todas as funções CRUD mantidas...
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
    if (alterarCredenciais.senhaAtual !== credenciaisAdmin.senha) {
      alert('Senha atual incorreta!');
      return;
    }

    if (!alterarCredenciais.novoUsuario || !alterarCredenciais.novaSenha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    if (alterarCredenciais.novaSenha !== alterarCredenciais.confirmarSenha) {
      alert('A confirmação de senha não confere!');
      return;
    }

    if (alterarCredenciais.novaSenha.length < 6) {
      alert('A nova senha deve ter pelo menos 6 caracteres!');
      return;
    }

    setCredenciaisAdmin({
      usuario: alterarCredenciais.novoUsuario,
      senha: alterarCredenciais.novaSenha
    });

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
    const checklistInicial = itensChecklist.map(item => ({
      item: item.nome,
      status: 'pendente',
      foto: false,
      observacao: '',
      obrigatorio: item.obrigatorio
    }));
    setChecklist(checklistInicial);
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

  // TELA DE LOGIN - MANTENDO SEU LAYOUT ORIGINAL
  if (tela === 'login') {
    return (
      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          maxWidth: '400px',
          width: '100%',
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '40px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
        }}>
          {/* Ícone e Título - Mantendo seu layout */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <Truck style={{ 
              width: '60px', 
              height: '60px', 
              color: '#4f46e5',
              margin: '0 auto 15px auto'
            }} />
            <h1 style={{ 
              fontSize: '32px', 
              fontWeight: 'bold', 
              color: '#1f2937',
              margin: 0
            }}>
              Sistema de Viagens
            </h1>
            <p style={{ 
              color: '#6b7280', 
              marginTop: '8px',
              fontSize: '16px'
            }}>
              Controle de Frota de Ônibus
            </p>
          </div>
          
          {/* Formulário - Mantendo estilo original */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500', 
              color: '#374151',
              marginBottom: '8px'
            }}>
              Usuário
            </label>
            <input
              type="text"
              value={loginData.usuario}
              onChange={(e) => setLoginData({...loginData, usuario: e.target.value})}
              placeholder="Nome do usuário ou 'admin'"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '25px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500', 
              color: '#374151',
              marginBottom: '8px'
            }}>
              Senha
            </label>
            <input
              type="password"
              value={loginData.senha}
              onChange={(e) => setLoginData({...loginData, senha: e.target.value})}
              placeholder="Senha"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <button
            onClick={fazerLogin}
            style={{
              width: '100%',
              backgroundColor: '#4f46e5',
              color: 'white',
              padding: '12px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          >
            Entrar
          </button>
          
          {/* Credenciais de teste - Mantendo seu estilo */}
          <div style={{ 
            fontSize: '14px', 
            color: '#6b7280', 
            textAlign: 'center',
            lineHeight: '1.5'
          }}>
            <p style={{ margin: '5px 0' }}>
              <strong>Admin:</strong> admin / admin123
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>Motorista:</strong> João Silva / 123456
            </p>
          </div>
        </div>
      </div>
    );
  }

  // DASHBOARD ADMIN - Com estilo consistente
  if (tela === 'dashboard-admin') {
    const viagensComProblemas = viagens.filter(v => v.temProblemas).length;
    
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
        <header style={{ 
          backgroundColor: 'white', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          padding: '16px 0'
        }}>
          <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: '0 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
              Painel Administrativo
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ color: '#6b7280' }}>Olá, {usuarioLogado}</span>
              <button
                onClick={logout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#dc2626',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                <LogOut size={20} />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </header>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
          {/* Cards de estatísticas */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            marginBottom: '32px'
          }}>
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Users style={{ color: '#2563eb', marginRight: '12px' }} size={32} />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Motoristas</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb', margin: '4px 0 0 0' }}>
                    {motoristas.length}
                  </p>
                </div>
              </div>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Truck style={{ color: '#059669', marginRight: '12px' }} size={32} />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Veículos</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#059669', margin: '4px 0 0 0' }}>
                    {veiculos.length}
                  </p>
                </div>
              </div>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Settings style={{ color: '#7c3aed', marginRight: '12px' }} size={32} />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Cidades</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#7c3aed', margin: '4px 0 0 0' }}>
                    {cidades.length}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FileText style={{ color: '#ea580c', marginRight: '12px' }} size={32} />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Viagens</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#ea580c', margin: '4px 0 0 0' }}>
                    {viagens.length}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <AlertTriangle style={{ color: '#dc2626', marginRight: '12px' }} size={32} />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Ocorrências</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc2626', margin: '4px 0 0 0' }}>
                    {viagensComProblemas}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Seção de gerenciamento */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '32px'
          }}>
            
            {/* Gerenciar Motoristas */}
            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                <Users style={{ marginRight: '8px' }} size={24} />
                Gerenciar Motoristas
              </h2>
              
              <div style={{ marginBottom: '16px' }}>
                <input
                  type="text"
                  placeholder="Nome do motorista"
                  value={novoMotorista.nome}
                  onChange={(e) => setNovoMotorista({...novoMotorista, nome: e.target.value})}
                  style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', marginBottom: '8px' }}
                />
                <input
                  type="password"
                  placeholder="Senha"
                  value={novoMotorista.senha}
                  onChange={(e) => setNovoMotorista({...novoMotorista, senha: e.target.value})}
                  style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', marginBottom: '8px' }}
                />
                <button
                  onClick={adicionarMotorista}
                  style={{ 
                    width: '100%', 
                    backgroundColor: '#2563eb', 
                    color: 'white', 
                    padding: '8px 16px', 
                    border: 'none', 
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <Plus size={16} />
                  Adicionar Motorista
                </button>
              </div>
              
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {motoristas.map(motorista => (
                  <div key={motorista.id} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '8px', 
                    backgroundColor: '#f9fafb', 
                    borderRadius: '4px',
                    marginBottom: '4px'
                  }}>
                    <div>
                      <span style={{ fontWeight: '500' }}>{motorista.nome}</span>
                      <span style={{ fontSize: '12px', color: '#6b7280', marginLeft: '8px' }}>
                        ({motorista.status})
                      </span>
                    </div>
                    <button
                      onClick={() => removerMotorista(motorista.id)}
                      style={{ color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Gerenciar Veículos */}
            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                <Truck style={{ marginRight: '8px' }} size={24} />
                Gerenciar Veículos
              </h2>
              
              <div style={{ marginBottom: '16px' }}>
                <input
                  type="text"
                  placeholder="Prefixo"
                  value={novoVeiculo.prefixo}
                  onChange={(e) => setNovoVeiculo({...novoVeiculo, prefixo: e.target.value})}
                  style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', marginBottom: '8px' }}
                />
                <input
                  type="text"
                  placeholder="Placa"
                  value={novoVeiculo.placa}
                  onChange={(e) => setNovoVeiculo({...novoVeiculo, placa: e.target.value})}
                  style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', marginBottom: '8px' }}
                />
                <input
                  type="text"
                  placeholder="Modelo"
                  value={novoVeiculo.modelo}
                  onChange={(e) => setNovoVeiculo({...novoVeiculo, modelo: e.target.value})}
                  style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', marginBottom: '8px' }}
                />
                <button
                  onClick={adicionarVeiculo}
                  style={{ 
                    width: '100%', 
                    backgroundColor: '#059669', 
                    color: 'white', 
                    padding: '8px 16px', 
                    border: 'none', 
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <Plus size={16} />
                  Adicionar Veículo
                </button>
              </div>
              
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {veiculos.map(veiculo => (
                  <div key={veiculo.id} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '8px', 
                    backgroundColor: '#f9fafb', 
                    borderRadius: '4px',
                    marginBottom: '4px'
                  }}>
                    <div>
                      <span style={{ fontWeight: '500' }}>{veiculo.prefixo}</span>
                      <span style={{ fontSize: '12px', color: '#6b7280', marginLeft: '8px' }}>
                        {veiculo.placa}
                      </span>
                      <div style={{ fontSize: '10px', color: '#9ca3af' }}>{veiculo.modelo}</div>
                    </div>
                    <button
                      onClick={() => removerVeiculo(veiculo.id)}
                      style={{ color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Relatório de Viagens */}
          {viagens.length > 0 && (
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
              padding: '24px',
              marginTop: '32px'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                <FileText style={{ marginRight: '8px' }} size={24} />
                Relatório de Viagens
              </h2>
              
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f9fafb' }}>
                      <th style={{ padding: '8px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Data/Hora</th>
                      <th style={{ padding: '8px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Motorista</th>
                      <th style={{ padding: '8px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Rota</th>
                      <th style={{ padding: '8px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Veículo</th>
                      <th style={{ padding: '8px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>KM</th>
                      <th style={{ padding: '8px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Status</th>
                      <th style={{ padding: '8px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {viagens.map(viagem => (
                      <tr key={viagem.id} style={{ 
                        borderBottom: '1px solid #f3f4f6',
                        backgroundColor: viagem.temProblemas ? '#fef2f2' : 'white'
                      }}>
                        <td style={{ padding: '8px 16px' }}>{viagem.dataHora}</td>
                        <td style={{ padding: '8px 16px' }}>{viagem.motorista}</td>
                        <td style={{ padding: '8px 16px' }}>{viagem.origem} → {viagem.destino}</td>
                        <td style={{ padding: '8px 16px' }}>{viagem.prefixo}</td>
                        <td style={{ padding: '8px 16px' }}>{viagem.kmPercorridos} km</td>
                        <td style={{ padding: '8px 16px' }}>
                          {viagem.temProblemas ? (
                            <div style={{ display: 'flex', alignItems: 'center', color: '#dc2626' }}>
                              <AlertTriangle size={16} style={{ marginRight: '4px' }} />
                              <span style={{ fontSize: '12px' }}>Com Ocorrências</span>
                            </div>
                          ) : (
                            <div style={{ display: 'flex', alignItems: 'center', color: '#059669' }}>
                              <CheckCircle size={16} style={{ marginRight: '4px' }} />
                              <span style={{ fontSize: '12px' }}>Normal</span>
                            </div>
                          )}
                        </td>
                        <td style={{ padding: '8px 16px' }}>
                          <button
                            onClick={() => verDetalhesViagem(viagem)}
                            style={{
                              backgroundColor: '#2563eb',
                              color: 'white',
                              padding: '4px 8px',
                              border: 'none',
                              borderRadius: '4px',
                              fontSize: '12px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <Eye size={12} />
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

  // SISTEMA DE CONTROLE DE VIAGEM (MOTORISTAS)
  if (tela === 'controle-viagem') {
    if (etapa === 'inicial') {
      return (
        <div style={{ 
          minHeight: '100vh', 
          background: 'linear-gradient(135deg, #bfdbfe 0%, #dbeafe 100%)',
          padding: '16px'
        }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e3a8a' }}>
              Sistema de Controle de Viagem
            </h1>
            <button
              onClick={logout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                color: '#dc2626',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              <LogOut size={20} />
              <span>Sair</span>
            </button>
          </header>
          
          <div style={{
            maxWidth: '500px',
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            padding: '32px'
          }}>
            
            {/* Campo Motorista */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151',
                marginBottom: '8px'
              }}>
                Motorista
              </label>
              <input
                type="text"
                value={dadosViagem.motorista}
                disabled
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  backgroundColor: '#f3f4f6',
                  color: '#6b7280',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Origem e Destino */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div style={{ position: 'relative' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
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
                  placeholder="Digite ou selecione a origem"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
                {mostrarSugestoesOrigem && sugestoesOrigem.length > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    backgroundColor: 'white',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    maxHeight: '160px',
                    overflowY: 'auto',
                    marginTop: '4px'
                  }}>
                    {sugestoesOrigem.map(cidade => (
                      <button
                        key={cidade.id}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          selecionarCidade(cidade, 'origem');
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '12px',
                          border: 'none',
                          borderBottom: '1px solid #f3f4f6',
                          backgroundColor: 'white',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#f8fafc'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                      >
                        <span style={{ fontWeight: '500' }}>{cidade.nome}</span>
                        <span style={{ color: '#6b7280', marginLeft: '8px' }}>- {cidade.uf}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div style={{ position: 'relative' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
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
                  placeholder="Digite ou selecione o destino"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
                {mostrarSugestoesDestino && sugestoesDestino.length > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    backgroundColor: 'white',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    maxHeight: '160px',
                    overflowY: 'auto',
                    marginTop: '4px'
                  }}>
                    {sugestoesDestino.map(cidade => (
                      <button
                        key={cidade.id}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          selecionarCidade(cidade, 'destino');
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '12px',
                          border: 'none',
                          borderBottom: '1px solid #f3f4f6',
                          backgroundColor: 'white',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#f8fafc'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                      >
                        <span style={{ fontWeight: '500' }}>{cidade.nome}</span>
                        <span style={{ color: '#6b7280', marginLeft: '8px' }}>- {cidade.uf}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Prefixo e KM Inicial */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Prefixo do Ônibus
                </label>
                <select
                  value={dadosViagem.prefixo}
                  onChange={(e) => handleInputChange('prefixo', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
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
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  KM Inicial
                </label>
                <input
                  type="number"
                  value={dadosViagem.kmInicial}
                  onChange={(e) => handleInputChange('kmInicial', e.target.value)}
                  placeholder="KM"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Checklist */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
                Checklist de Verificação
              </h3>
              <div>
                {checklist.map((item, index) => (
                  <div key={index} style={{ 
                    backgroundColor: '#f9fafb', 
                    borderRadius: '8px', 
                    padding: '16px',
                    marginBottom: '12px'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: item.status === 'nao-conforme' ? '12px' : 0
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: '500' }}>{item.item}</span>
                        {item.obrigatorio ? (
                          <span style={{
                            backgroundColor: '#fef2f2',
                            color: '#991b1b',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '12px'
                          }}>
                            Obrigatório
                          </span>
                        ) : (
                          <span style={{
                            backgroundColor: '#eff6ff',
                            color: '#1d4ed8',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '12px'
                          }}>
                            Opcional
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          onClick={() => handleChecklistChange(index, 'status', 'conforme')}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '4px',
                            fontSize: '14px',
                            fontWeight: '500',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: item.status === 'conforme' ? '#059669' : '#e5e7eb',
                            color: item.status === 'conforme' ? 'white' : '#374151'
                          }}
                        >
                          Conforme
                        </button>
                        <button
                          onClick={() => handleChecklistChange(index, 'status', 'nao-conforme')}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '4px',
                            fontSize: '14px',
                            fontWeight: '500',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: item.status === 'nao-conforme' ? '#dc2626' : '#e5e7eb',
                            color: item.status === 'nao-conforme' ? 'white' : '#374151'
                          }}
                        >
                          Não Conforme
                        </button>
                        <button
                          onClick={() => handleChecklistChange(index, 'foto', !item.foto)}
                          style={{
                            padding: '8px',
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: item.foto ? '#2563eb' : '#d1d5db',
                            color: item.foto ? 'white' : '#6b7280'
                          }}
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
                        style={{
                          width: '100%',
                          padding: '8px',
                          fontSize: '14px',
                          border: '1px solid #d1d5db',
                          borderRadius: '4px',
                          resize: 'none',
                          rows: 2,
                          boxSizing: 'border-box'
                        }}
                        rows="2"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Botão Iniciar Viagem */}
            <button
              onClick={iniciarViagem}
              disabled={!podeIniciarViagem()}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                color: 'white',
                border: 'none',
                cursor: podeIniciarViagem() ? 'pointer' : 'not-allowed',
                backgroundColor: podeIniciarViagem() ? '#16a34a' : '#9ca3af',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Play size={24} />
              <span>Iniciar Viagem</span>
            </button>
          </div>
        </div>
      );
    }

    if (etapa === 'viagem') {
      return (
        <div style={{ 
          minHeight: '100vh', 
          background: 'linear-gradient(135deg, #bbf7d0 0%, #dcfce7 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            maxWidth: '500px',
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            padding: '40px',
            textAlign: 'center'
          }}>
            <div style={{ marginBottom: '32px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#16a34a',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}>
                <Play style={{ color: 'white' }} size={40} />
              </div>
              <h2 style={{ 
                fontSize: '32px', 
                fontWeight: 'bold', 
                color: '#16a34a',
                margin: '0 0 8px 0'
              }}>
                Boa Viagem!
              </h2>
              <p style={{ color: '#6b7280', marginBottom: '4px' }}>
                Viagem de {dadosViagem.origem} para {dadosViagem.destino}
              </p>
              <p style={{ fontSize: '14px', color: '#9ca3af' }}>
                Ônibus: {dadosViagem.prefixo} | Motorista: {dadosViagem.motorista}
              </p>
            </div>

            <button
              onClick={finalizarViagem}
              style={{
                width: '100%',
                backgroundColor: '#dc2626',
                color: 'white',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
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
        <div style={{ 
          minHeight: '100vh', 
          background: 'linear-gradient(135deg, #fed7aa 0%, #fef3c7 100%)',
          padding: '16px'
        }}>
          <div style={{
            maxWidth: '500px',
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            padding: '32px'
          }}>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: '#ea580c',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              Finalização da Viagem
            </h2>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151',
                marginBottom: '8px'
              }}>
                KM Final
              </label>
              <input
                type="number"
                value={dadosViagem.kmFinal}
                onChange={(e) => handleInputChange('kmFinal', e.target.value)}
                placeholder="Quilometragem final"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: kmInvalido ? '1px solid #dc2626' : '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  backgroundColor: kmInvalido ? '#fef2f2' : 'white',
                  boxSizing: 'border-box'
                }}
              />
              {kmInvalido && (
                <div style={{
                  marginTop: '8px',
                  padding: '8px',
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '4px',
                  color: '#b91c1c',
                  fontSize: '14px'
                }}>
                  <strong⚠️ Erro:</strong> KM final ({kmFinal}) deve ser maior que KM inicial ({kmInicial})
                </div>
              )}
              <div style={{ marginTop: '4px', fontSize: '12px', color: '#6b7280' }}>
                KM inicial da viagem: {dadosViagem.kmInicial}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <FileText size={16} />
                Relatar Diversidades da Viagem
              </label>
              <textarea
                value={dadosViagem.diversidades}
                onChange={(e) => handleInputChange('diversidades', e.target.value)}
                placeholder="Descreva qualquer ocorrência durante a viagem..."
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  height: '80px',
                  resize: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Wrench size={16} />
                Ordem de Serviço
              </label>
              <textarea
                value={dadosViagem.ordemServico}
                onChange={(e) => handleInputChange('ordemServico', e.target.value)}
                placeholder="Serviços necessários no veículo..."
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  height: '80px',
                  resize: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ 
              backgroundColor: '#f9fafb', 
              padding: '16px', 
              borderRadius: '8px',
              marginBottom: '24px'
            }}>
              <h4 style={{ fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Resumo da Viagem:</h4>
              <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                <p style={{ margin: '4px 0' }}><strong>Motorista:</strong> {dadosViagem.motorista}</p>
                <p style={{ margin: '4px 0' }}><strong>Rota:</strong> {dadosViagem.origem} → {dadosViagem.destino}</p>
                <p style={{ margin: '4px 0' }}><strong>Ônibus:</strong> {dadosViagem.prefixo}</p>
                <p style={{ margin: '4px 0' }}><strong>KM Inicial:</strong> {dadosViagem.kmInicial}</p>
                {dadosViagem.kmFinal && (
                  <p style={{ margin: '4px 0' }}><strong>KM Percorridos:</strong> {dadosViagem.kmFinal - dadosViagem.kmInicial} km</p>
                )}
              </div>
            </div>

            <button
              onClick={concluirViagem}
              disabled={kmInvalido || !dadosViagem.kmFinal}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                color: 'white',
                border: 'none',
                cursor: (kmInvalido || !dadosViagem.kmFinal) ? 'not-allowed' : 'pointer',
                backgroundColor: (kmInvalido || !dadosViagem.kmFinal) ? '#9ca3af' : '#2563eb'
              }}
            >
              {kmInvalido ? 'Corrija o KM Final' : 'Concluir Viagem'}
            </button>
          </div>
        </div>
      );
    }

    if (etapa === 'concluida') {
      return (
        <div style={{ 
          minHeight: '100vh', 
          background: 'linear-gradient(135deg, #bfdbfe 0%, #dbeafe 100%)',
          padding: '16px'
        }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e3a8a' }}>
              Sistema de Controle de Viagem
            </h1>
            <button
              onClick={logout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                color: '#dc2626',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              <LogOut size={20} />
              <span>Sair</span>
            </button>
          </header>
          
          <div style={{
            maxWidth: '500px',
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            padding: '40px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#2563eb',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}>
              <CheckCircle style={{ color: 'white' }} size={40} />
            </div>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: '#2563eb',
              marginBottom: '16px'
            }}>
              Viagem Concluída!
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '24px' }}>
              Todos os dados foram salvos com sucesso.
            </p>
            
            <div style={{ 
              backgroundColor: '#f9fafb', 
              padding: '16px', 
              borderRadius: '8px',
              marginBottom: '24px',
              textAlign: 'left'
            }}>
              <h4 style={{ fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Relatório Final:</h4>
              <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                <p style={{ margin: '4px 0' }}><strong>Motorista:</strong> {dadosViagem.motorista}</p>
                <p style={{ margin: '4px 0' }}><strong>Rota:</strong> {dadosViagem.origem} → {dadosViagem.destino}</p>
                <p style={{ margin: '4px 0' }}><strong>Ônibus:</strong> {dadosViagem.prefixo}</p>
                <p style={{ margin: '4px 0' }}><strong>KM Percorridos:</strong> {dadosViagem.kmFinal - dadosViagem.kmInicial} km</p>
                {dadosViagem.diversidades && (
                  <p style={{ margin: '4px 0' }}><strong>Diversidades:</strong> {dadosViagem.diversidades}</p>
                )}
                {dadosViagem.ordemServico && (
                  <p style={{ margin: '4px 0' }}><strong>Ordem de Serviço:</strong> {dadosViagem.ordemServico}</p>
                )}
              </div>
            </div>

            <button
              onClick={novaViagem}
              style={{
                width: '100%',
                backgroundColor: '#16a34a',
                color: 'white',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Nova Viagem
            </button>
          </div>
        </div>
      );
    }
  }

  // Adicione outras telas conforme necessário...
  return null;
};

export default App;
