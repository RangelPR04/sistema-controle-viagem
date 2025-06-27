import React, { useState } from 'react';
import { Camera, CheckCircle, XCircle, Play, Square, FileText, Wrench, Users, Truck, Settings, LogOut, Eye, Plus, Edit2, Trash2, AlertTriangle, ArrowLeft, MapPin, Clock, User } from 'lucide-react';

const App = () => {
  const [tela, setTela] = useState('login');
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState(null);
  const [viagemDetalhada, setViagemDetalhada] = useState(null);
  const [modalAtivo, setModalAtivo] = useState(null); // Para os cartões clicáveis
  
  // Estados para dados
  const [credenciaisAdmin, setCredenciaisAdmin] = useState({
    usuario: 'admin',
    senha: 'admin123'
  });
  
  // Usuários do sistema com diferentes perfis
  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: 'João Silva', senha: '123456', tipo: 'motorista', status: 'ativo' },
    { id: 2, nome: 'Maria Santos', senha: '123456', tipo: 'motorista', status: 'ativo' },
    { id: 3, nome: 'Pedro Oliveira', senha: '123456', tipo: 'motorista', status: 'ativo' },
    { id: 4, nome: 'Carlos Manutenção', senha: 'manut123', tipo: 'manutencao', status: 'ativo' },
    { id: 5, nome: 'Ana Gerente', senha: 'gerente123', tipo: 'gerencia', status: 'ativo' }
  ]);
  
  const [veiculos, setVeiculos] = useState([
    { id: 1, prefixo: '1001', placa: 'ABC-1234', modelo: 'Mercedes-Benz O-500', status: 'ativo' },
    { id: 2, prefixo: '1002', placa: 'DEF-5678', modelo: 'Volvo B270F', status: 'ativo' },
    { id: 3, prefixo: '1003', placa: 'GHI-9012', modelo: 'Scania K270', status: 'manutencao' }
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
  
  const [viagens, setViagens] = useState([
    {
      id: 1,
      motorista: 'João Silva',
      origem: 'São Paulo - SP',
      destino: 'Rio de Janeiro - RJ',
      prefixo: '1003',
      kmInicial: '50000',
      kmFinal: '50450',
      kmPercorridos: 450,
      diversidades: 'Trânsito intenso na Dutra',
      ordemServico: 'Verificar freios',
      dataHora: '2025-01-15 08:30',
      temProblemas: true,
      statusManutencao: undefined,
      checklist: [
        { item: 'Pneus', status: 'conforme', foto: true, observacao: '', obrigatorio: true },
        { item: 'Freios', status: 'nao-conforme', foto: true, observacao: 'Ruído nos freios traseiros', obrigatorio: true },
        { item: 'Luzes', status: 'conforme', foto: false, observacao: '', obrigatorio: true }
      ],
      itensNaoConformes: [
        {
          id: 'item_001',
          item: 'Freios',
          status: 'nao-conforme',
          observacao: 'Ruído nos freios traseiros',
          obrigatorio: true,
          resolvido: false
        }
      ]
    }
  ]);
  
  // Estados do formulário de login
  const [loginData, setLoginData] = useState({ usuario: '', senha: '' });
  
  // Estados para formulários
  const [novoUsuario, setNovoUsuario] = useState({ nome: '', senha: '', tipo: 'motorista' });
  const [novoVeiculo, setNovoVeiculo] = useState({ prefixo: '', placa: '', modelo: '' });
  const [novaCidade, setNovaCidade] = useState({ nome: '', uf: '' });
  
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

  // Função de login melhorada
  const fazerLogin = () => {
    // Login como admin
    if (loginData.usuario === credenciaisAdmin.usuario && loginData.senha === credenciaisAdmin.senha) {
      setUsuarioLogado('Administrador');
      setTipoUsuario('admin');
      setTela('dashboard-admin');
      return;
    }
    
    // Login como usuário do sistema
    const usuario = usuarios.find(u => 
      u.nome.toLowerCase() === loginData.usuario.toLowerCase() && 
      u.senha === loginData.senha &&
      u.status === 'ativo'
    );
    
    if (usuario) {
      setUsuarioLogado(usuario.nome);
      setTipoUsuario(usuario.tipo);
      
      switch (usuario.tipo) {
        case 'motorista':
          setTela('controle-viagem');
          setDadosViagem(prev => ({ ...prev, motorista: usuario.nome }));
          const checklistInicial = itensChecklist.map(item => ({
            item: item.nome,
            status: 'pendente',
            foto: false,
            observacao: '',
            obrigatorio: item.obrigatorio
          }));
          setChecklist(checklistInicial);
          break;
        case 'manutencao':
          setTela('dashboard-manutencao');
          break;
        case 'gerencia':
          setTela('dashboard-gerencia');
          break;
        default:
          setTela('dashboard-admin');
      }
    } else {
      alert('Usuário ou senha incorretos!');
    }
  };

  const logout = () => {
    setUsuarioLogado(null);
    setTipoUsuario(null);
    setTela('login');
    setLoginData({ usuario: '', senha: '' });
    setEtapa('inicial');
    setViagemDetalhada(null);
    setModalAtivo(null);
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
  const adicionarUsuario = () => {
    if (novoUsuario.nome && novoUsuario.senha) {
      const novoId = Math.max(...usuarios.map(u => u.id), 0) + 1;
      setUsuarios([...usuarios, { 
        id: novoId, 
        ...novoUsuario, 
        status: 'ativo' 
      }]);
      setNovoUsuario({ nome: '', senha: '', tipo: 'motorista' });
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

  const removerUsuario = (id) => {
    setUsuarios(usuarios.filter(u => u.id !== id));
  };

  const removerVeiculo = (id) => {
    setVeiculos(veiculos.filter(v => v.id !== id));
  };

  const liberarVeiculo = (id) => {
    const veiculo = veiculos.find(v => v.id === id);
    if (!veiculo) return;
    
    // Verificar se ainda há problemas pendentes para este veículo
    const problemasRestantes = viagens.filter(v => 
      v.prefixo === veiculo.prefixo && 
      ((v.itensNaoConformes?.some(item => !item.resolvido)) || 
       (v.ordemServico && v.ordemServico.trim() && v.statusManutencao !== 'resolvida'))
    );
    
    if (problemasRestantes.length > 0) {
      const confirmar = confirm(
        `⚠️ ATENÇÃO!\n\nO veículo ${veiculo.prefixo} ainda possui ${problemasRestantes.length} problema(s) não resolvido(s).\n\nTem certeza que deseja liberar o veículo mesmo assim?\n\n(Recomenda-se resolver todos os problemas antes da liberação)`
      );
      
      if (!confirmar) return;
    }
    
    setVeiculos(veiculos.map(v => 
      v.id === id ? { ...v, status: 'ativo' } : v
    ));
    
    alert(`✅ Veículo ${veiculo.prefixo} foi liberado e está disponível para uso!`);
  };

  const colocarEmManutencao = (prefixo) => {
    setVeiculos(veiculos.map(v => 
      v.prefixo === prefixo ? { ...v, status: 'manutencao' } : v
    ));
    
    // Marcar as viagens deste veículo como "em tratamento"
    setViagens(viagens.map(v => 
      v.prefixo === prefixo && (v.ordemServico || v.checklist?.some(c => c.status === 'nao-conforme'))
        ? { ...v, statusManutencao: 'em_tratamento' }
        : v
    ));
    
    alert(`🔧 Veículo ${prefixo} foi colocado em manutenção.`);
  };

  const resolverItemChecklist = (viagemId, itemId) => {
    setViagens(viagens.map(v => 
      v.id === viagemId 
        ? {
            ...v,
            itensNaoConformes: v.itensNaoConformes?.map(item => 
              item.id === itemId ? { ...item, resolvido: true } : item
            )
          }
        : v
    ));
    
    // Verificar se todos os itens desta viagem foram resolvidos
    const viagem = viagens.find(v => v.id === viagemId);
    if (viagem) {
      const itensRestantes = viagem.itensNaoConformes?.filter(item => item.id !== itemId && !item.resolvido) || [];
      const osResolvida = viagem.statusManutencao === 'resolvida';
      
      if (itensRestantes.length === 0 && osResolvida) {
        // Verificar se este veículo não tem mais pendências em outras viagens
        const outrasViagensProblemas = viagens.filter(v => 
          v.prefixo === viagem.prefixo && 
          v.id !== viagemId &&
          ((v.itensNaoConformes?.some(item => !item.resolvido)) || 
           (v.ordemServico && v.statusManutencao !== 'resolvida'))
        );
        
        if (outrasViagensProblemas.length === 0) {
          // Perguntar se quer liberar o veículo
          if (confirm(`Todos os problemas do veículo ${viagem.prefixo} foram resolvidos. Deseja liberar o veículo para uso?`)) {
            liberarVeiculo(veiculos.find(v => v.prefixo === viagem.prefixo)?.id);
          }
        }
      }
    }
    
    alert('✅ Item do checklist resolvido!');
  };

  const processarOS = (viagemId) => {
    const viagem = viagens.find(v => v.id === viagemId);
    if (viagem) {
      setViagens(viagens.map(v => 
        v.id === viagemId ? { ...v, statusManutencao: 'resolvida' } : v
      ));
      
      // Verificar se todos os itens desta viagem foram resolvidos
      const itensNaoResolvidos = viagem.itensNaoConformes?.filter(item => !item.resolvido) || [];
      
      if (itensNaoResolvidos.length === 0) {
        // Verificar se este veículo não tem mais pendências em outras viagens
        const outrasViagensProblemas = viagens.filter(v => 
          v.prefixo === viagem.prefixo && 
          v.id !== viagemId &&
          ((v.itensNaoConformes?.some(item => !item.resolvido)) || 
           (v.ordemServico && v.statusManutencao !== 'resolvida'))
        );
        
        if (outrasViagensProblemas.length === 0) {
          // Perguntar se quer liberar o veículo
          if (confirm(`Todos os problemas do veículo ${viagem.prefixo} foram resolvidos. Deseja liberar o veículo para uso?`)) {
            liberarVeiculo(veiculos.find(v => v.prefixo === viagem.prefixo)?.id);
          }
        }
      }
      
      alert(`✅ Ordem de serviço do veículo ${viagem.prefixo} foi processada!`);
    }
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
      alert('ERRO: O KM final deve ser maior que o KM inicial!');
      return;
    }
    
    // Verificar se há itens não conformes no checklist
    const itensNaoConformes = checklist.filter(item => item.status === 'nao-conforme');
    const temProblemas = itensNaoConformes.length > 0 || 
                        dadosViagem.diversidades.trim() !== '' || 
                        dadosViagem.ordemServico.trim() !== '';
    
    const novaViagem = {
      id: viagens.length + 1,
      ...dadosViagem,
      checklist: [...checklist],
      dataHora: new Date().toLocaleString(),
      kmPercorridos: kmFinal - kmInicial,
      temProblemas,
      itensNaoConformes: itensNaoConformes.map(item => ({
        ...item,
        resolvido: false,
        id: Math.random().toString(36).substr(2, 9) // ID único para cada item
      }))
    };
    
    setViagens([...viagens, novaViagem]);
    
    // Se há itens não conformes, colocar veículo automaticamente em manutenção
    if (itensNaoConformes.length > 0) {
      setVeiculos(veiculos.map(v => 
        v.prefixo === dadosViagem.prefixo ? { ...v, status: 'manutencao' } : v
      ));
      
      alert(`⚠️ Viagem concluída!\n\nVeículo ${dadosViagem.prefixo} foi automaticamente colocado em manutenção devido aos itens não conformes encontrados:\n\n${itensNaoConformes.map(item => `• ${item.item}: ${item.observacao}`).join('\n')}`);
    } else if (dadosViagem.ordemServico.trim()) {
      alert('✅ Viagem concluída!\n\n⚠️ Ordem de serviço registrada para o veículo.');
    } else {
      alert('✅ Viagem concluída com sucesso!');
    }
    
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

  // Componente de Modal para os cartões
  const Modal = ({ titulo, children, onFechar }) => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '80vh',
        overflow: 'auto',
        position: 'relative'
      }}>
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>{titulo}</h2>
          <button
            onClick={onFechar}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6b7280'
            }}
          >
            ×
          </button>
        </div>
        <div style={{ padding: '24px' }}>
          {children}
        </div>
      </div>
    </div>
  );

  // Função para handle do Enter no login
  const handleLoginKeyPress = (e) => {
    if (e.key === 'Enter') {
      fazerLogin();
    }
  };

  // TELA DE LOGIN
  if (tela === 'login') {
    return (
      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'auto' // Adiciona rolagem
      }}>
        <div style={{
          maxWidth: '400px',
          width: '100%',
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '40px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          margin: '20px 0' // Espaço para rolagem
        }}>
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
              onKeyPress={handleLoginKeyPress}
              placeholder="Nome do usuário"
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
              onKeyPress={handleLoginKeyPress}
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
          
          <div style={{ 
            fontSize: '12px', 
            color: '#6b7280', 
            textAlign: 'center',
            lineHeight: '1.4'
          }}>
            <p style={{ margin: '3px 0' }}><strong>Admin:</strong> admin / admin123</p>
            <p style={{ margin: '3px 0' }}><strong>Motorista:</strong> João Silva / 123456</p>
            <p style={{ margin: '3px 0' }}><strong>Manutenção:</strong> Carlos Manutenção / manut123</p>
            <p style={{ margin: '3px 0' }}><strong>Gerência:</strong> Ana Gerente / gerente123</p>
          </div>
        </div>
      </div>
    );
  }

  // DASHBOARD ADMIN
  if (tela === 'dashboard-admin') {
    const motoristas = usuarios.filter(u => u.tipo === 'motorista');
    const viagensComProblemas = viagens.filter(v => v.temProblemas).length;
    const veiculosManutencao = veiculos.filter(v => v.status === 'manutencao').length;
    const problemasAtivos = viagens.reduce((total, viagem) => {
      const itensNaoResolvidos = viagem.itensNaoConformes?.filter(item => !item.resolvido)?.length || 0;
      const osNaoResolvida = (viagem.ordemServico && viagem.ordemServico.trim() && viagem.statusManutencao !== 'resolvida') ? 1 : 0;
      return total + itensNaoResolvidos + osNaoResolvida;
    }, 0);
    
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
          {/* Cards de estatísticas - Agora clicáveis */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            marginBottom: '32px'
          }}>
            <div 
              onClick={() => setModalAtivo('usuarios')}
              style={{ 
                backgroundColor: 'white', 
                padding: '24px', 
                borderRadius: '8px', 
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Users style={{ color: '#2563eb', marginRight: '12px' }} size={32} />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Usuários</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb', margin: '4px 0 0 0' }}>
                    {usuarios.length}
                  </p>
                </div>
              </div>
            </div>
            
            <div 
              onClick={() => setModalAtivo('veiculos')}
              style={{ 
                backgroundColor: 'white', 
                padding: '24px', 
                borderRadius: '8px', 
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
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
            
            <div 
              onClick={() => setModalAtivo('cidades')}
              style={{ 
                backgroundColor: 'white', 
                padding: '24px', 
                borderRadius: '8px', 
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <MapPin style={{ color: '#7c3aed', marginRight: '12px' }} size={32} />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Cidades</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#7c3aed', margin: '4px 0 0 0' }}>
                    {cidades.length}
                  </p>
                </div>
              </div>
            </div>

            <div 
              onClick={() => setModalAtivo('viagens')}
              style={{ 
                backgroundColor: 'white', 
                padding: '24px', 
                borderRadius: '8px', 
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
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

            <div 
              onClick={() => setModalAtivo('ocorrencias')}
              style={{ 
                backgroundColor: 'white', 
                padding: '24px', 
                borderRadius: '8px', 
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <AlertTriangle style={{ color: '#dc2626', marginRight: '12px' }} size={32} />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Problemas Ativos</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc2626', margin: '4px 0 0 0' }}>
                    {problemasAtivos}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modais dos cartões */}
        {modalAtivo === 'usuarios' && (
          <Modal titulo="Gerenciar Usuários" onFechar={() => setModalAtivo(null)}>
            <div style={{ marginBottom: '16px' }}>
              <input
                type="text"
                placeholder="Nome do usuário"
                value={novoUsuario.nome}
                onChange={(e) => setNovoUsuario({...novoUsuario, nome: e.target.value})}
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '4px', 
                  marginBottom: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
              <input
                type="password"
                placeholder="Senha"
                value={novoUsuario.senha}
                onChange={(e) => setNovoUsuario({...novoUsuario, senha: e.target.value})}
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '4px', 
                  marginBottom: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
              <select
                value={novoUsuario.tipo}
                onChange={(e) => setNovoUsuario({...novoUsuario, tipo: e.target.value})}
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '4px', 
                  marginBottom: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              >
                <option value="motorista">Motorista</option>
                <option value="manutencao">Manutenção</option>
                <option value="gerencia">Gerência</option>
              </select>
              <button
                onClick={adicionarUsuario}
                style={{ 
                  width: '100%', 
                  backgroundColor: '#2563eb', 
                  color: 'white', 
                  padding: '8px 16px', 
                  border: 'none', 
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Adicionar Usuário
              </button>
            </div>
            
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {usuarios.map(usuario => (
                <div key={usuario.id} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '8px', 
                  backgroundColor: '#f9fafb', 
                  borderRadius: '4px',
                  marginBottom: '4px'
                }}>
                  <div>
                    <span style={{ fontWeight: '500' }}>{usuario.nome}</span>
                    <span style={{ fontSize: '12px', color: '#6b7280', marginLeft: '8px' }}>
                      ({usuario.tipo})
                    </span>
                  </div>
                  <button
                    onClick={() => removerUsuario(usuario.id)}
                    style={{ color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </Modal>
        )}

        {modalAtivo === 'veiculos' && (
          <Modal titulo="Gerenciar Veículos" onFechar={() => setModalAtivo(null)}>
            <div style={{ marginBottom: '16px' }}>
              <input
                type="text"
                placeholder="Prefixo"
                value={novoVeiculo.prefixo}
                onChange={(e) => setNovoVeiculo({...novoVeiculo, prefixo: e.target.value})}
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '4px', 
                  marginBottom: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
              <input
                type="text"
                placeholder="Placa"
                value={novoVeiculo.placa}
                onChange={(e) => setNovoVeiculo({...novoVeiculo, placa: e.target.value})}
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '4px', 
                  marginBottom: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
              <input
                type="text"
                placeholder="Modelo"
                value={novoVeiculo.modelo}
                onChange={(e) => setNovoVeiculo({...novoVeiculo, modelo: e.target.value})}
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '4px', 
                  marginBottom: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
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
                  fontSize: '14px'
                }}
              >
                Adicionar Veículo
              </button>
            </div>
            
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {veiculos.map(veiculo => (
                <div key={veiculo.id} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '8px', 
                  backgroundColor: veiculo.status === 'manutencao' ? '#fef2f2' : '#f9fafb', 
                  borderRadius: '4px',
                  marginBottom: '4px'
                }}>
                  <div>
                    <span style={{ fontWeight: '500' }}>{veiculo.prefixo}</span>
                    <span style={{ fontSize: '12px', color: '#6b7280', marginLeft: '8px' }}>
                      {veiculo.placa} - {veiculo.status}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {veiculo.status === 'manutencao' && (
                      <button
                        onClick={() => liberarVeiculo(veiculo.id)}
                        style={{
                          backgroundColor: '#059669',
                          color: 'white',
                          padding: '4px 8px',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        Liberar
                      </button>
                    )}
                    <button
                      onClick={() => removerVeiculo(veiculo.id)}
                      style={{ color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Modal>
        )}

        {modalAtivo === 'cidades' && (
          <Modal titulo="Gerenciar Cidades" onFechar={() => setModalAtivo(null)}>
            <div style={{ marginBottom: '16px' }}>
              <input
                type="text"
                placeholder="Nome da cidade"
                value={novaCidade.nome}
                onChange={(e) => setNovaCidade({...novaCidade, nome: e.target.value})}
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '4px', 
                  marginBottom: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
              <input
                type="text"
                placeholder="UF (ex: SP)"
                value={novaCidade.uf}
                onChange={(e) => setNovaCidade({...novaCidade, uf: e.target.value.toUpperCase()})}
                maxLength="2"
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '4px', 
                  marginBottom: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
              <button
                onClick={adicionarCidade}
                style={{ 
                  width: '100%', 
                  backgroundColor: '#7c3aed', 
                  color: 'white', 
                  padding: '8px 16px', 
                  border: 'none', 
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Adicionar Cidade
              </button>
            </div>
            
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {cidades.map(cidade => (
                <div key={cidade.id} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '8px', 
                  backgroundColor: '#f9fafb', 
                  borderRadius: '4px',
                  marginBottom: '4px'
                }}>
                  <span>{cidade.nome} - {cidade.uf}</span>
                </div>
              ))}
            </div>
          </Modal>
        )}

        {modalAtivo === 'viagens' && (
          <Modal titulo="Relatório de Viagens" onFechar={() => setModalAtivo(null)}>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {viagens.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#6b7280' }}>Nenhuma viagem realizada ainda.</p>
              ) : (
                viagens.map(viagem => (
                  <div key={viagem.id} style={{ 
                    padding: '16px', 
                    backgroundColor: viagem.temProblemas ? '#fef2f2' : '#f9fafb', 
                    borderRadius: '8px',
                    marginBottom: '8px',
                    border: viagem.temProblemas ? '1px solid #fecaca' : '1px solid #e5e7eb'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <strong>{viagem.motorista}</strong>
                      <span style={{ fontSize: '12px', color: '#6b7280' }}>{viagem.dataHora}</span>
                    </div>
                    <p style={{ margin: '4px 0', fontSize: '14px' }}>
                      <strong>Rota:</strong> {viagem.origem} → {viagem.destino}
                    </p>
                    <p style={{ margin: '4px 0', fontSize: '14px' }}>
                      <strong>Veículo:</strong> {viagem.prefixo} | <strong>KM:</strong> {viagem.kmPercorridos} km
                    </p>
                    {viagem.temProblemas && (
                      <div style={{ marginTop: '8px', padding: '8px', backgroundColor: '#fee2e2', borderRadius: '4px' }}>
                        <span style={{ fontSize: '12px', color: '#991b1b', fontWeight: '500' }}>⚠️ Viagem com ocorrências</span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </Modal>
        )}

        {modalAtivo === 'ocorrencias' && (
          <Modal titulo="Problemas Ativos" onFechar={() => setModalAtivo(null)}>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {(() => {
                const problemasAtivos = [];
                viagens.forEach(viagem => {
                  // Adicionar itens não conformes não resolvidos
                  const itensNaoResolvidos = viagem.itensNaoConformes?.filter(item => !item.resolvido) || [];
                  itensNaoResolvidos.forEach(item => {
                    problemasAtivos.push({
                      tipo: 'checklist',
                      viagem,
                      descricao: `${item.item}: ${item.observacao}`,
                      status: 'Pendente'
                    });
                  });
                  
                  // Adicionar OS não resolvidas
                  if (viagem.ordemServico && viagem.ordemServico.trim() && viagem.statusManutencao !== 'resolvida') {
                    problemasAtivos.push({
                      tipo: 'os',
                      viagem,
                      descricao: viagem.ordemServico,
                      status: 'Pendente'
                    });
                  }
                });

                if (problemasAtivos.length === 0) {
                  return (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#059669' }}>
                      <CheckCircle size={48} style={{ marginBottom: '12px' }} />
                      <p style={{ fontSize: '16px', fontWeight: '500' }}>Nenhum problema ativo!</p>
                      <p style={{ fontSize: '14px', color: '#6b7280' }}>Todos os veículos estão em perfeitas condições.</p>
                    </div>
                  );
                }

                return problemasAtivos.map((problema, idx) => (
                  <div key={idx} style={{ 
                    padding: '16px', 
                    backgroundColor: '#fef2f2', 
                    borderRadius: '8px',
                    marginBottom: '8px',
                    border: '1px solid #fecaca'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ 
                          backgroundColor: '#dc2626', 
                          color: 'white', 
                          padding: '2px 8px', 
                          borderRadius: '12px', 
                          fontSize: '11px',
                          fontWeight: '500'
                        }}>
                          {problema.tipo === 'checklist' ? 'CHECKLIST' : 'ORDEM DE SERVIÇO'}
                        </span>
                        <strong style={{ color: '#991b1b' }}>Veículo: {problema.viagem.prefixo}</strong>
                      </div>
                      <span style={{ fontSize: '12px', color: '#6b7280' }}>{problema.viagem.dataHora}</span>
                    </div>
                    <p style={{ margin: '4px 0', fontSize: '14px' }}>
                      <strong>Motorista:</strong> {problema.viagem.motorista}
                    </p>
                    <p style={{ margin: '4px 0', fontSize: '14px' }}>
                      <strong>Rota:</strong> {problema.viagem.origem} → {problema.viagem.destino}
                    </p>
                    <div style={{ 
                      marginTop: '8px', 
                      padding: '8px', 
                      backgroundColor: '#fee2e2', 
                      borderRadius: '4px',
                      borderLeft: '4px solid #dc2626'
                    }}>
                      <strong style={{ color: '#991b1b', fontSize: '13px' }}>Problema:</strong>
                      <p style={{ margin: '2px 0 0 0', color: '#991b1b', fontSize: '13px' }}>{problema.descricao}</p>
                    </div>
                  </div>
                ));
              })()}
            </div>
          </Modal>
        )}
      </div>
    );
  }

  // DASHBOARD MANUTENÇÃO
  if (tela === 'dashboard-manutencao') {
    const veiculosManutencao = veiculos.filter(v => v.status === 'manutencao');
    const viagensComOS = viagens.filter(v => 
      v.ordemServico && 
      v.ordemServico.trim() !== '' && 
      v.statusManutencao !== 'resolvida'
    );
    
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
              Painel de Manutenção
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
          {/* Veículos em Manutenção */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
            padding: '24px',
            marginBottom: '24px'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
              <Wrench style={{ marginRight: '8px' }} size={24} />
              Veículos em Manutenção ({veiculosManutencao.length})
            </h2>
            
            {veiculosManutencao.length === 0 ? (
              <p style={{ color: '#6b7280', textAlign: 'center', padding: '20px' }}>
                Nenhum veículo em manutenção no momento.
              </p>
            ) : (
              <div>
                {veiculosManutencao.map(veiculo => {
                  // Buscar todas as viagens com problemas para este veículo
                  const viagensVeiculo = viagens.filter(v => v.prefixo === veiculo.prefixo);
                  const problemasVeiculo = viagensVeiculo.reduce((acc, viagem) => {
                    // Adicionar itens não conformes não resolvidos
                    const itensNaoResolvidos = viagem.itensNaoConformes?.filter(item => !item.resolvido) || [];
                    itensNaoResolvidos.forEach(item => {
                      acc.push({
                        tipo: 'checklist',
                        viagemId: viagem.id,
                        itemId: item.id,
                        descricao: `${item.item}: ${item.observacao}`,
                        data: viagem.dataHora,
                        motorista: viagem.motorista
                      });
                    });
                    
                    // Adicionar OS não resolvidas
                    if (viagem.ordemServico && viagem.ordemServico.trim() && viagem.statusManutencao !== 'resolvida') {
                      acc.push({
                        tipo: 'os',
                        viagemId: viagem.id,
                        descricao: viagem.ordemServico,
                        data: viagem.dataHora,
                        motorista: viagem.motorista
                      });
                    }
                    
                    return acc;
                  }, []);
                  
                  return (
                    <div key={veiculo.id} style={{ 
                      padding: '16px', 
                      backgroundColor: '#fef2f2', 
                      borderRadius: '8px',
                      marginBottom: '12px',
                      border: '1px solid #fecaca'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <div>
                          <span style={{ fontWeight: '500', fontSize: '16px' }}>{veiculo.prefixo}</span>
                          <span style={{ fontSize: '14px', color: '#6b7280', marginLeft: '8px' }}>
                            {veiculo.placa} - {veiculo.modelo}
                          </span>
                          <span style={{ 
                            marginLeft: '12px', 
                            fontSize: '12px', 
                            backgroundColor: '#fee2e2', 
                            color: '#991b1b', 
                            padding: '2px 6px', 
                            borderRadius: '12px' 
                          }}>
                            {problemasVeiculo.length} problema(s) pendente(s)
                          </span>
                        </div>
                        <button
                          onClick={() => liberarVeiculo(veiculo.id)}
                          style={{
                            backgroundColor: '#059669',
                            color: 'white',
                            padding: '8px 16px',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '14px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <CheckCircle size={16} />
                          Liberar Veículo (Forçar)
                        </button>
                      </div>
                      
                      {/* Lista detalhada de problemas */}
                      {problemasVeiculo.length > 0 && (
                        <div style={{ marginTop: '12px' }}>
                          <strong style={{ fontSize: '14px', color: '#991b1b', marginBottom: '8px', display: 'block' }}>
                            Problemas a serem resolvidos:
                          </strong>
                          {problemasVeiculo.map((problema, idx) => (
                            <div key={idx} style={{ 
                              marginBottom: '8px', 
                              padding: '12px', 
                              backgroundColor: '#fee2e2', 
                              borderRadius: '6px',
                              border: '1px solid #fecaca'
                            }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                                <div style={{ flex: 1 }}>
                                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#991b1b' }}>
                                    {problema.tipo === 'checklist' ? '🔧 Checklist' : '📝 Ordem de Serviço'}
                                  </div>
                                  <div style={{ fontSize: '13px', color: '#7f1d1d', marginTop: '2px' }}>
                                    {problema.descricao}
                                  </div>
                                  <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px' }}>
                                    {problema.data} | {problema.motorista}
                                  </div>
                                </div>
                                <button
                                  onClick={() => {
                                    if (problema.tipo === 'checklist') {
                                      resolverItemChecklist(problema.viagemId, problema.itemId);
                                    } else {
                                      processarOS(problema.viagemId);
                                    }
                                  }}
                                  style={{
                                    backgroundColor: '#059669',
                                    color: 'white',
                                    padding: '4px 8px',
                                    border: 'none',
                                    borderRadius: '4px',
                                    fontSize: '11px',
                                    cursor: 'pointer',
                                    marginLeft: '8px',
                                    flexShrink: 0
                                  }}
                                >
                                  ✅ Resolver
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Ordens de Serviço Pendentes */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
            padding: '24px'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
              <FileText style={{ marginRight: '8px' }} size={24} />
              Ordens de Serviço Pendentes ({viagensComOS.length})
            </h2>
            
            {viagensComOS.length === 0 ? (
              <p style={{ color: '#6b7280', textAlign: 'center', padding: '20px' }}>
                Nenhuma ordem de serviço pendente.
              </p>
            ) : (
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {viagensComOS.map(viagem => (
                  <div key={viagem.id} style={{ 
                    padding: '16px', 
                    backgroundColor: '#fffbeb', 
                    borderRadius: '8px',
                    marginBottom: '8px',
                    border: '1px solid #fed7aa'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <strong style={{ color: '#92400e' }}>Veículo: {viagem.prefixo}</strong>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => colocarEmManutencao(viagem.prefixo)}
                          style={{
                            backgroundColor: '#dc2626',
                            color: 'white',
                            padding: '4px 8px',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '12px',
                            cursor: 'pointer'
                          }}
                        >
                          Colocar em Manutenção
                        </button>
                        <button
                          onClick={() => processarOS(viagem.id)}
                          style={{
                            backgroundColor: '#059669',
                            color: 'white',
                            padding: '4px 8px',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '12px',
                            cursor: 'pointer'
                          }}
                        >
                          Processar OS
                        </button>
                      </div>
                    </div>
                    <p style={{ margin: '4px 0', fontSize: '14px' }}>
                      <strong>Data:</strong> {viagem.dataHora}
                    </p>
                    <p style={{ margin: '4px 0', fontSize: '14px' }}>
                      <strong>Motorista:</strong> {viagem.motorista}
                    </p>
                    <p style={{ margin: '4px 0', fontSize: '14px' }}>
                      <strong>Rota:</strong> {viagem.origem} → {viagem.destino}
                    </p>
                    <div style={{ 
                      marginTop: '12px', 
                      padding: '12px', 
                      backgroundColor: '#fef3c7', 
                      borderRadius: '4px',
                      borderLeft: '4px solid #f59e0b'
                    }}>
                      <strong style={{ color: '#92400e' }}>Ordem de Serviço:</strong>
                      <p style={{ margin: '4px 0 0 0', color: '#92400e' }}>{viagem.ordemServico}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // DASHBOARD GERÊNCIA
  if (tela === 'dashboard-gerencia') {
    const motoristas = usuarios.filter(u => u.tipo === 'motorista');
    const viagensComProblemas = viagens.filter(v => v.temProblemas).length;
    const totalKm = viagens.reduce((total, viagem) => total + viagem.kmPercorridos, 0);
    const problemasAtivos = viagens.reduce((total, viagem) => {
      const itensNaoResolvidos = viagem.itensNaoConformes?.filter(item => !item.resolvido)?.length || 0;
      const osNaoResolvida = (viagem.ordemServico && viagem.ordemServico.trim() && viagem.statusManutencao !== 'resolvida') ? 1 : 0;
      return total + itensNaoResolvidos + osNaoResolvida;
    }, 0);
    
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
              Painel Gerencial
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
                <FileText style={{ color: '#ea580c', marginRight: '12px' }} size={32} />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Total Viagens</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#ea580c', margin: '4px 0 0 0' }}>
                    {viagens.length}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <MapPin style={{ color: '#7c3aed', marginRight: '12px' }} size={32} />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Total KM</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#7c3aed', margin: '4px 0 0 0' }}>
                    {totalKm.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <AlertTriangle style={{ color: '#dc2626', marginRight: '12px' }} size={32} />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Problemas Ativos</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc2626', margin: '4px 0 0 0' }}>
                    {problemasAtivos}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Relatório Resumido de Viagens */}
          {viagens.length > 0 && (
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
              padding: '24px'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                <FileText style={{ marginRight: '8px' }} size={24} />
                Relatório de Viagens (Últimas 10)
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
                    </tr>
                  </thead>
                  <tbody>
                    {viagens.slice(-10).reverse().map(viagem => (
                      <tr key={viagem.id} style={{ 
                        borderBottom: '1px solid #f3f4f6',
                        backgroundColor: viagem.temProblemas ? '#fef2f2' : 'white'
                      }}>
                        <td style={{ padding: '8px 16px', fontSize: '14px' }}>{viagem.dataHora}</td>
                        <td style={{ padding: '8px 16px', fontSize: '14px' }}>{viagem.motorista}</td>
                        <td style={{ padding: '8px 16px', fontSize: '14px' }}>{viagem.origem} → {viagem.destino}</td>
                        <td style={{ padding: '8px 16px', fontSize: '14px' }}>{viagem.prefixo}</td>
                        <td style={{ padding: '8px 16px', fontSize: '14px' }}>{viagem.kmPercorridos} km</td>
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

  // SISTEMA DE CONTROLE DE VIAGEM (MOTORISTAS) - Mantém o código original
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
                  {veiculos.map(veiculo => (
                    <option key={veiculo.id} value={veiculo.prefixo}>
                      {veiculo.prefixo} - {veiculo.placa} {veiculo.status === 'manutencao' ? '(⚠️ Em Manutenção)' : ''}
                    </option>
                  ))}
                </select>
                
                {/* Aviso de veículo com pendências */}
                {dadosViagem.prefixo && veiculos.find(v => v.prefixo === dadosViagem.prefixo)?.status === 'manutencao' && (
                  <div style={{
                    marginTop: '8px',
                    padding: '12px',
                    backgroundColor: '#fffbeb',
                    border: '1px solid #fed7aa',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <AlertTriangle size={20} style={{ color: '#f59e0b', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: '600', color: '#92400e', fontSize: '14px' }}>
                        ⚠️ Veículo com Pendências
                      </div>
                      <div style={{ fontSize: '13px', color: '#92400e', marginTop: '2px' }}>
                        Este veículo possui pendências de manutenção. Viagem permitida, mas informe qualquer problema encontrado.
                      </div>
                    </div>
                  </div>
                )}
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
                  <strong>⚠️ Erro:</strong> KM final ({kmFinal}) deve ser maior que KM inicial ({kmInicial})
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
                
                {/* Mostrar itens não conformes */}
                {checklist.filter(item => item.status === 'nao-conforme').length > 0 && (
                  <div style={{ 
                    marginTop: '12px', 
                    padding: '12px', 
                    backgroundColor: '#fffbeb', 
                    border: '1px solid #fed7aa', 
                    borderRadius: '6px' 
                  }}>
                    <p style={{ margin: '0 0 6px 0', fontWeight: '600', color: '#92400e' }}>
                      ⚠️ Itens com Problemas Detectados:
                    </p>
                    {checklist.filter(item => item.status === 'nao-conforme').map((item, idx) => (
                      <p key={idx} style={{ margin: '2px 0', fontSize: '13px', color: '#92400e' }}>
                        • <strong>{item.item}:</strong> {item.observacao}
                      </p>
                    ))}
                    <p style={{ margin: '6px 0 0 0', fontSize: '12px', color: '#92400e', fontStyle: 'italic' }}>
                      O veículo foi automaticamente colocado em manutenção.
                    </p>
                  </div>
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

  // TELA DE DETALHES DA VIAGEM
  if (tela === 'detalhes-viagem') {
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                onClick={() => {
                  if (tipoUsuario === 'admin') {
                    setTela('dashboard-admin');
                  } else if (tipoUsuario === 'gerencia') {
                    setTela('dashboard-gerencia');
                  }
                  setViagemDetalhada(null);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#6b7280',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                <ArrowLeft size={20} />
                <span>Voltar</span>
              </button>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
                Detalhes da Viagem
              </h1>
            </div>
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

        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
          {viagemDetalhada && (
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '12px', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
              overflow: 'hidden'
            }}>
              {/* Cabeçalho da viagem */}
              <div style={{ 
                backgroundColor: viagemDetalhada.temProblemas ? '#fee2e2' : '#f0f9ff',
                padding: '24px',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h2 style={{ 
                    fontSize: '24px', 
                    fontWeight: 'bold', 
                    color: viagemDetalhada.temProblemas ? '#991b1b' : '#0369a1',
                    margin: 0
                  }}>
                    Viagem #{viagemDetalhada.id}
                  </h2>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    backgroundColor: viagemDetalhada.temProblemas ? '#dc2626' : '#059669',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    {viagemDetalhada.temProblemas ? (
                      <>
                        <AlertTriangle size={16} />
                        <span>Com Ocorrências</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle size={16} />
                        <span>Concluída</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div>
                    <span style={{ fontSize: '14px', color: '#6b7280', display: 'block' }}>Data e Hora</span>
                    <span style={{ fontSize: '16px', fontWeight: '500' }}>{viagemDetalhada.dataHora}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '14px', color: '#6b7280', display: 'block' }}>Motorista</span>
                    <span style={{ fontSize: '16px', fontWeight: '500' }}>{viagemDetalhada.motorista}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '14px', color: '#6b7280', display: 'block' }}>Veículo</span>
                    <span style={{ fontSize: '16px', fontWeight: '500' }}>{viagemDetalhada.prefixo}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '14px', color: '#6b7280', display: 'block' }}>KM Percorridos</span>
                    <span style={{ fontSize: '16px', fontWeight: '500' }}>{viagemDetalhada.kmPercorridos} km</span>
                  </div>
                </div>
              </div>

              {/* Informações da rota */}
              <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                  <MapPin style={{ marginRight: '8px' }} size={20} />
                  Informações da Rota
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '16px' }}>
                  <div style={{ 
                    padding: '16px', 
                    backgroundColor: '#f9fafb', 
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <span style={{ fontSize: '14px', color: '#6b7280', display: 'block' }}>Origem</span>
                    <span style={{ fontSize: '16px', fontWeight: '500' }}>{viagemDetalhada.origem}</span>
                  </div>
                  <div style={{ color: '#6b7280' }}>→</div>
                  <div style={{ 
                    padding: '16px', 
                    backgroundColor: '#f9fafb', 
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <span style={{ fontSize: '14px', color: '#6b7280', display: 'block' }}>Destino</span>
                    <span style={{ fontSize: '16px', fontWeight: '500' }}>{viagemDetalhada.destino}</span>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                  <div style={{ 
                    padding: '16px', 
                    backgroundColor: '#f9fafb', 
                    borderRadius: '8px'
                  }}>
                    <span style={{ fontSize: '14px', color: '#6b7280', display: 'block' }}>KM Inicial</span>
                    <span style={{ fontSize: '16px', fontWeight: '500' }}>{viagemDetalhada.kmInicial}</span>
                  </div>
                  <div style={{ 
                    padding: '16px', 
                    backgroundColor: '#f9fafb', 
                    borderRadius: '8px'
                  }}>
                    <span style={{ fontSize: '14px', color: '#6b7280', display: 'block' }}>KM Final</span>
                    <span style={{ fontSize: '16px', fontWeight: '500' }}>{viagemDetalhada.kmFinal}</span>
                  </div>
                </div>
              </div>

              {/* Checklist */}
              <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                  <Settings style={{ marginRight: '8px' }} size={20} />
                  Checklist de Verificação
                </h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {viagemDetalhada.checklist.map((item, index) => (
                    <div key={index} style={{ 
                      padding: '16px', 
                      backgroundColor: item.status === 'nao-conforme' ? '#fef2f2' : '#f0f9ff',
                      borderRadius: '8px',
                      border: item.status === 'nao-conforme' ? '1px solid #fecaca' : '1px solid #bae6fd'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: '500' }}>{item.item}</span>
                          {item.obrigatorio && (
                            <span style={{
                              backgroundColor: '#fef2f2',
                              color: '#991b1b',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              fontSize: '12px'
                            }}>
                              Obrigatório
                            </span>
                          )}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '16px',
                            fontSize: '12px',
                            fontWeight: '500',
                            backgroundColor: item.status === 'conforme' ? '#dcfce7' : '#fef2f2',
                            color: item.status === 'conforme' ? '#166534' : '#991b1b'
                          }}>
                            {item.status === 'conforme' ? 'Conforme' : 'Não Conforme'}
                          </span>
                          {item.foto && (
                            <div style={{
                              padding: '4px',
                              backgroundColor: '#dbeafe',
                              borderRadius: '4px',
                              color: '#1e40af'
                            }}>
                              <Camera size={16} />
                            </div>
                          )}
                        </div>
                      </div>
                      {item.observacao && (
                        <div style={{ 
                          marginTop: '8px',
                          padding: '8px',
                          backgroundColor: '#fee2e2',
                          borderRadius: '4px',
                          borderLeft: '4px solid #dc2626'
                        }}>
                          <span style={{ fontSize: '14px', color: '#991b1b' }}>
                            <strong>Observação:</strong> {item.observacao}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Diversidades e OS */}
              {(viagemDetalhada.diversidades || viagemDetalhada.ordemServico) && (
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                    <AlertTriangle style={{ marginRight: '8px' }} size={20} />
                    Ocorrências e Serviços
                  </h3>
                  
                  {viagemDetalhada.diversidades && (
                    <div style={{ 
                      marginBottom: '16px',
                      padding: '16px',
                      backgroundColor: '#fffbeb',
                      borderRadius: '8px',
                      border: '1px solid #fed7aa'
                    }}>
                      <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#92400e', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                        <FileText style={{ marginRight: '6px' }} size={16} />
                        Diversidades da Viagem
                      </h4>
                      <p style={{ fontSize: '14px', color: '#92400e', margin: 0, lineHeight: '1.5' }}>
                        {viagemDetalhada.diversidades}
                      </p>
                    </div>
                  )}
                  
                  {viagemDetalhada.ordemServico && (
                    <div style={{ 
                      padding: '16px',
                      backgroundColor: '#fef2f2',
                      borderRadius: '8px',
                      border: '1px solid #fecaca'
                    }}>
                      <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#991b1b', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                        <Wrench style={{ marginRight: '6px' }} size={16} />
                        Ordem de Serviço
                      </h4>
                      <p style={{ fontSize: '14px', color: '#991b1b', margin: 0, lineHeight: '1.5' }}>
                        {viagemDetalhada.ordemServico}
                      </p>
                      {tipoUsuario === 'manutencao' && (
                        <div style={{ marginTop: '12px' }}>
                          <button
                            onClick={() => {
                              // Simular liberação do veículo após manutenção
                              alert('Ordem de serviço processada! Veículo liberado para uso.');
                            }}
                            style={{
                              backgroundColor: '#059669',
                              color: 'white',
                              padding: '8px 16px',
                              border: 'none',
                              borderRadius: '4px',
                              fontSize: '14px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <CheckCircle size={16} />
                            Processar OS
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default App;
