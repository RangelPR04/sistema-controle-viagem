import React, { useState, useEffect } from 'react';
import { Camera, CheckCircle, XCircle, Play, Square, FileText, Wrench, Users, Truck, Settings, LogOut, Eye, Plus, Edit2, Trash2, AlertTriangle, ArrowLeft, MapPin, Clock, User } from 'lucide-react';

const App = () => {
  const [tela, setTela] = useState('login');
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState(null);
  const [viagemDetalhada, setViagemDetalhada] = useState(null);
  const [modalAtivo, setModalAtivo] = useState(null);
  
  // Estados para dados
  const [credenciaisAdmin, setCredenciaisAdmin] = useState({
    usuario: 'admin',
    senha: 'admin123'
  });
  
  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: 'João Silva', senha: '123456', tipo: 'motorista', status: 'ativo' },
    { id: 2, nome: 'Maria Santos', senha: '123456', tipo: 'motorista', status: 'ativo' },
    { id: 3, nome: 'Pedro Oliveira', senha: '123456', tipo: 'motorista', status: 'ativo' },
    { id: 4, nome: 'Carlos Manutenção', senha: 'manut123', tipo: 'manutencao', status: 'ativo' },
    { id: 5, nome: 'Ana Gerente', senha: 'gerente123', tipo: 'gerencia', status: 'ativo' }
  ]);
  
  const [veiculos, setVeiculos] = useState([
    { 
      id: 1, 
      prefixo: '1001', 
      placa: 'ABC-1234', 
      modelo: 'Mercedes-Benz O-500', 
      status: 'manutencao',
      kmAtual: 50450,
      proximaRevisao: 55000,
      tipoRevisao: 'Revisão 10.000km',
      historicoKm: [
        { data: '2025-01-15', km: 50450, motorista: 'João Silva', tipo: 'viagem' },
        { data: '2025-01-10', km: 50000, motorista: 'Maria Santos', tipo: 'viagem' }
      ]
    },
    { 
      id: 2, 
      prefixo: '1002', 
      placa: 'DEF-5678', 
      modelo: 'Volvo B270F', 
      status: 'ativo',
      kmAtual: 42300,
      proximaRevisao: 45000,
      tipoRevisao: 'Revisão 5.000km',
      historicoKm: [
        { data: '2025-01-14', km: 42300, motorista: 'Pedro Oliveira', tipo: 'viagem' }
      ]
    },
    { 
      id: 3, 
      prefixo: '1003', 
      placa: 'GHI-9012', 
      modelo: 'Scania K270', 
      status: 'manutencao',
      kmAtual: 75680,
      proximaRevisao: 80000,
      tipoRevisao: 'Revisão 20.000km',
      historicoKm: [
        { data: '2025-01-14', km: 75680, motorista: 'Maria Santos', tipo: 'viagem' }
      ]
    }
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
      prefixo: '1001',
      kmInicial: '50000',
      kmFinal: '50450',
      kmPercorridos: 450,
      diversidades: 'Trânsito intenso na Dutra',
      ordemServico: 'Verificar freios - relatado pelo motorista\n\nCHECKLIST - Itens não conformes: Freios (Ruído nos freios traseiros); Luzes (Farol baixo direito queimado)',
      dataHora: '2025-01-15 08:30',
      temProblemas: true,
      precisaManutencao: true,
      statusManutencao: 'pendente',
      checklist: [
        { item: 'Pneus', status: 'conforme', foto: true, observacao: '', obrigatorio: true },
        { item: 'Freios', status: 'nao-conforme', foto: true, observacao: 'Ruído nos freios traseiros', obrigatorio: true },
        { item: 'Luzes', status: 'nao-conforme', foto: false, observacao: 'Farol baixo direito queimado', obrigatorio: true },
        { item: 'Portas', status: 'conforme', foto: false, observacao: '', obrigatorio: true },
        { item: 'Interior', status: 'conforme', foto: false, observacao: '', obrigatorio: true }
      ]
    }
  ]);
  
  const [loginData, setLoginData] = useState({ usuario: '', senha: '' });
  const [novoUsuario, setNovoUsuario] = useState({ nome: '', senha: '', tipo: 'motorista' });
  const [novoVeiculo, setNovoVeiculo] = useState({ 
    prefixo: '', 
    placa: '', 
    modelo: '', 
    kmAtual: '', 
    proximaRevisao: '', 
    tipoRevisao: 'Revisão 5.000km' 
  });
  const [novaCidade, setNovaCidade] = useState({ nome: '', uf: '' });
  
  const [revisoesAgendadas, setRevisoesAgendadas] = useState([
    {
      id: 1,
      prefixo: '1001',
      tipoRevisao: 'Revisão 10.000km',
      kmProgramado: 55000,
      kmAtual: 50450,
      status: 'agendada',
      dataAgendamento: '2025-01-15'
    }
  ]);
  
  const [sugestoesOrigem, setSugestoesOrigem] = useState([]);
  const [sugestoesDestino, setSugestoesDestino] = useState([]);
  const [mostrarSugestoesOrigem, setMostrarSugestoesOrigem] = useState(false);
  const [mostrarSugestoesDestino, setMostrarSugestoesDestino] = useState(false);
  
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

  // PWA Service Worker e Manifest
  useEffect(() => {
    // Registrar Service Worker
    if ('serviceWorker' in navigator) {
      const swContent = `
        const CACHE_NAME = 'bus-control-v1';
        const urlsToCache = [
          '/',
          '/static/js/bundle.js',
          '/static/css/main.css'
        ];

        self.addEventListener('install', function(event) {
          event.waitUntil(
            caches.open(CACHE_NAME)
              .then(function(cache) {
                return cache.addAll(urlsToCache);
              })
          );
        });

        self.addEventListener('fetch', function(event) {
          event.respondWith(
            caches.match(event.request)
              .then(function(response) {
                if (response) {
                  return response;
                }
                return fetch(event.request);
              }
            )
          );
        });
      `;
      
      const blob = new Blob([swContent], { type: 'application/javascript' });
      const swUrl = URL.createObjectURL(blob);
      
      navigator.serviceWorker.register(swUrl)
        .then(reg => console.log('SW registrado'))
        .catch(err => console.log('SW erro', err));
    }

    // Criar manifest.json dinamicamente
    const manifest = {
      name: "Sistema de Controle de Viagens",
      short_name: "ControleViagens",
      description: "Sistema de controle de frota de ônibus",
      start_url: "/",
      display: "standalone",
      background_color: "#4f46e5",
      theme_color: "#4f46e5",
      orientation: "portrait",
      icons: [
        {
          src: "data:image/svg+xml;base64," + btoa(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
              <rect width="200" height="200" fill="#4f46e5"/>
              <path d="M50 80h100c10 0 20 10 20 20v40c0 10-10 20-20 20h-100c-10 0-20-10-20-20v-40c0-10 10-20 20-20z" fill="white"/>
              <circle cx="70" cy="140" r="15" fill="#4f46e5"/>
              <circle cx="130" cy="140" r="15" fill="#4f46e5"/>
              <rect x="60" y="90" width="80" height="30" fill="#4f46e5"/>
            </svg>
          `),
          sizes: "192x192",
          type: "image/svg+xml"
        },
        {
          src: "data:image/svg+xml;base64," + btoa(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <rect width="512" height="512" fill="#4f46e5"/>
              <path d="M128 205h256c26 0 46 20 46 46v102c0 26-20 46-46 46h-256c-26 0-46-20-46-46v-102c0-26 20-46 46-46z" fill="white"/>
              <circle cx="179" cy="358" r="38" fill="#4f46e5"/>
              <circle cx="333" cy="358" r="38" fill="#4f46e5"/>
              <rect x="154" y="230" width="204" height="77" fill="#4f46e5"/>
            </svg>
          `),
          sizes: "512x512",
          type: "image/svg+xml"
        }
      ]
    };

    const manifestBlob = new Blob([JSON.stringify(manifest)], { type: 'application/json' });
    const manifestUrl = URL.createObjectURL(manifestBlob);
    
    // Adicionar link do manifest ao head
    let manifestLink = document.querySelector('link[rel="manifest"]');
    if (!manifestLink) {
      manifestLink = document.createElement('link');
      manifestLink.rel = 'manifest';
      document.head.appendChild(manifestLink);
    }
    manifestLink.href = manifestUrl;

    // Adicionar meta tags para PWA
    const metaTags = [
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
      { name: 'theme-color', content: '#4f46e5' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'apple-mobile-web-app-title', content: 'ControleViagens' },
      { name: 'mobile-web-app-capable', content: 'yes' }
    ];

    metaTags.forEach(tag => {
      let existingTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (!existingTag) {
        existingTag = document.createElement('meta');
        existingTag.name = tag.name;
        document.head.appendChild(existingTag);
      }
      existingTag.content = tag.content;
    });

  }, []);

  // Função de login
  const fazerLogin = () => {
    if (loginData.usuario === credenciaisAdmin.usuario && loginData.senha === credenciaisAdmin.senha) {
      setUsuarioLogado('Administrador');
      setTipoUsuario('admin');
      setTela('dashboard-admin');
      return;
    }
    
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
    
    const itensNaoConformes = checklist.filter(item => item.status === 'nao-conforme');
    let osAutomatica = '';
    
    if (itensNaoConformes.length > 0) {
      osAutomatica = `CHECKLIST - Itens não conformes: ${itensNaoConformes.map(item => 
        `${item.item}${item.observacao ? ` (${item.observacao})` : ''}`
      ).join('; ')}`;
    }
    
    let ordemServicoCompleta = '';
    if (dadosViagem.ordemServico.trim() && osAutomatica) {
      ordemServicoCompleta = `${dadosViagem.ordemServico.trim()}\n\n${osAutomatica}`;
    } else if (dadosViagem.ordemServico.trim()) {
      ordemServicoCompleta = dadosViagem.ordemServico.trim();
    } else if (osAutomatica) {
      ordemServicoCompleta = osAutomatica;
    }
    
    const novaViagem = {
      id: viagens.length + 1,
      ...dadosViagem,
      ordemServico: ordemServicoCompleta,
      checklist: [...checklist],
      dataHora: new Date().toLocaleString(),
      kmPercorridos: kmFinal - kmInicial,
      temProblemas: checklist.some(item => item.status === 'nao-conforme') || 
                   dadosViagem.diversidades.trim() !== '' || 
                   ordemServicoCompleta.trim() !== '',
      precisaManutencao: itensNaoConformes.length > 0 || dadosViagem.ordemServico.trim() !== ''
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

  const handleLoginKeyPress = (e) => {
    if (e.key === 'Enter') {
      fazerLogin();
    }
  };

  // Estilos responsivos para mobile
  const isMobile = window.innerWidth <= 768;
  
  const mobileStyles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: isMobile ? '10px' : '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflowY: 'auto'
    },
    card: {
      maxWidth: isMobile ? '95%' : '400px',
      width: '100%',
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: isMobile ? '20px' : '40px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
      margin: '20px 0'
    },
    input: {
      width: '100%',
      padding: isMobile ? '14px' : '12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: isMobile ? '18px' : '16px',
      boxSizing: 'border-box',
      WebkitAppearance: 'none',
      appearance: 'none'
    },
    button: {
      width: '100%',
      backgroundColor: '#4f46e5',
      color: 'white',
      padding: isMobile ? '16px' : '12px',
      border: 'none',
      borderRadius: '8px',
      fontSize: isMobile ? '18px' : '16px',
      fontWeight: '600',
      cursor: 'pointer',
      marginBottom: '20px',
      WebkitAppearance: 'none',
      appearance: 'none'
    },
    header: {
      padding: isMobile ? '12px 16px' : '16px 24px',
      fontSize: isMobile ? '16px' : '18px'
    },
    viagemCard: {
      maxWidth: isMobile ? '95%' : '500px',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      padding: isMobile ? '20px' : '32px'
    }
  };

  // TELA DE LOGIN
  if (tela === 'login') {
    return (
      <div style={mobileStyles.container}>
        <div style={mobileStyles.card}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <Truck style={{ 
              width: isMobile ? '50px' : '60px', 
              height: isMobile ? '50px' : '60px', 
              color: '#4f46e5',
              margin: '0 auto 15px auto'
            }} />
            <h1 style={{ 
              fontSize: isMobile ? '24px' : '32px', 
              fontWeight: 'bold', 
              color: '#1f2937',
              margin: 0
            }}>
              Sistema de Viagens
            </h1>
            <p style={{ 
              color: '#6b7280', 
              marginTop: '8px',
              fontSize: isMobile ? '14px' : '16px'
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
              style={mobileStyles.input}
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
              style={mobileStyles.input}
            />
          </div>
          
          <button
            onClick={fazerLogin}
            style={mobileStyles.button}
          >
            Entrar
          </button>
          
          <div style={{ 
            fontSize: isMobile ? '11px' : '12px', 
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

  // SISTEMA DE CONTROLE DE VIAGEM (MOTORISTAS)
  if (tela === 'controle-viagem') {
    if (etapa === 'inicial') {
      return (
        <div style={{ 
          minHeight: '100vh', 
          background: 'linear-gradient(135deg, #bfdbfe 0%, #dbeafe 100%)',
          padding: isMobile ? '10px' : '16px'
        }}>
          <header style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <h1 style={{ 
              fontSize: isMobile ? '18px' : '24px', 
              fontWeight: 'bold', 
              color: '#1e3a8a',
              margin: 0
            }}>
              {isMobile ? 'Controle de Viagem' : 'Sistema de Controle de Viagem'}
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
                fontSize: isMobile ? '14px' : '16px',
                padding: isMobile ? '8px' : '0'
              }}
            >
              <LogOut size={isMobile ? 18 : 20} />
              <span>Sair</span>
            </button>
          </header>
          
          <div style={mobileStyles.viagemCard}>
            
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
                  ...mobileStyles.input,
                  backgroundColor: '#f3f4f6',
                  color: '#6b7280'
                }}
              />
            </div>

            {/* Origem e Destino */}
            <div style={{ 
              display: isMobile ? 'block' : 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
              gap: '16px', 
              marginBottom: '20px' 
            }}>
              <div style={{ position: 'relative', marginBottom: isMobile ? '16px' : '0' }}>
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
                  style={mobileStyles.input}
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
                          padding: isMobile ? '16px 12px' : '12px',
                          border: 'none',
                          borderBottom: '1px solid #f3f4f6',
                          backgroundColor: 'white',
                          cursor: 'pointer',
                          fontSize: isMobile ? '16px' : '14px'
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
                  style={mobileStyles.input}
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
                          padding: isMobile ? '16px 12px' : '12px',
                          border: 'none',
                          borderBottom: '1px solid #f3f4f6',
                          backgroundColor: 'white',
                          cursor: 'pointer',
                          fontSize: isMobile ? '16px' : '14px'
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
            <div style={{ 
              display: isMobile ? 'block' : 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
              gap: '16px', 
              marginBottom: '24px' 
            }}>
              <div style={{ marginBottom: isMobile ? '16px' : '0' }}>
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
                  onChange={(e) => {
                    handleInputChange('prefixo', e.target.value);
                    if (e.target.value) {
                      const veiculoSelecionado = veiculos.find(v => v.prefixo === e.target.value);
                      if (veiculoSelecionado && veiculoSelecionado.kmAtual) {
                        handleInputChange('kmInicial', veiculoSelecionado.kmAtual.toString());
                      }
                    }
                  }}
                  style={mobileStyles.input}
                >
                  <option value="">Selecione</option>
                  {veiculos.map(veiculo => (
                    <option key={veiculo.id} value={veiculo.prefixo}>
                      {veiculo.prefixo} - {veiculo.placa} {veiculo.status === 'manutencao' ? '(⚠️ Em Manutenção)' : ''} - KM: {veiculo.kmAtual?.toLocaleString() || 'N/A'}
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
                  inputMode="numeric"
                  value={dadosViagem.kmInicial}
                  onChange={(e) => handleInputChange('kmInicial', e.target.value)}
                  placeholder={dadosViagem.prefixo ? `KM atual: ${veiculos.find(v => v.prefixo === dadosViagem.prefixo)?.kmAtual?.toLocaleString() || 'N/A'}` : 'KM'}
                  style={mobileStyles.input}
                />
                {dadosViagem.prefixo && (
                  <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                    💡 KM atual do veículo: {veiculos.find(v => v.prefixo === dadosViagem.prefixo)?.kmAtual?.toLocaleString() || 'N/A'}
                  </div>
                )}
              </div>
            </div>

            {/* Checklist - Otimizado para mobile */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ 
                fontSize: isMobile ? '16px' : '18px', 
                fontWeight: '600', 
                color: '#1f2937', 
                marginBottom: '16px' 
              }}>
                Checklist de Verificação
              </h3>
              <div>
                {checklist.map((item, index) => (
                  <div key={index} style={{ 
                    backgroundColor: '#f9fafb', 
                    borderRadius: '8px', 
                    padding: isMobile ? '12px' : '16px',
                    marginBottom: '12px'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start',
                      marginBottom: item.status === 'nao-conforme' ? '12px' : 0,
                      flexWrap: isMobile ? 'wrap' : 'nowrap',
                      gap: '8px'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        flex: isMobile ? '1 1 100%' : 'none',
                        marginBottom: isMobile ? '8px' : '0'
                      }}>
                        <span style={{ fontWeight: '500', fontSize: isMobile ? '15px' : '14px' }}>{item.item}</span>
                        {item.obrigatorio ? (
                          <span style={{
                            backgroundColor: '#fef2f2',
                            color: '#991b1b',
                            padding: '2px 6px',
                            borderRadius: '12px',
                            fontSize: '11px'
                          }}>
                            Obrigatório
                          </span>
                        ) : (
                          <span style={{
                            backgroundColor: '#eff6ff',
                            color: '#1d4ed8',
                            padding: '2px 6px',
                            borderRadius: '12px',
                            fontSize: '11px'
                          }}>
                            Opcional
                          </span>
                        )}
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '6px',
                        flex: isMobile ? '1 1 100%' : 'none',
                        justifyContent: isMobile ? 'flex-end' : 'flex-start'
                      }}>
                        <button
                          onClick={() => handleChecklistChange(index, 'status', 'conforme')}
                          style={{
                            padding: isMobile ? '8px 12px' : '6px 12px',
                            borderRadius: '4px',
                            fontSize: isMobile ? '13px' : '14px',
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
                            padding: isMobile ? '8px 12px' : '6px 12px',
                            borderRadius: '4px',
                            fontSize: isMobile ? '13px' : '14px',
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
                            padding: isMobile ? '10px' : '8px',
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
                          padding: isMobile ? '12px' : '8px',
                          fontSize: isMobile ? '16px' : '14px',
                          border: '1px solid #d1d5db',
                          borderRadius: '4px',
                          resize: 'none',
                          rows: 2,
                          boxSizing: 'border-box',
                          WebkitAppearance: 'none',
                          appearance: 'none'
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
                padding: isMobile ? '18px 16px' : '16px',
                borderRadius: '8px',
                fontSize: isMobile ? '18px' : '16px',
                fontWeight: '600',
                color: 'white',
                border: 'none',
                cursor: podeIniciarViagem() ? 'pointer' : 'not-allowed',
                backgroundColor: podeIniciarViagem() ? '#16a34a' : '#9ca3af',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                WebkitAppearance: 'none',
                appearance: 'none'
              }}
            >
              <Play size={isMobile ? 20 : 24} />
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
          padding: isMobile ? '10px' : '16px'
        }}>
          <div style={{
            maxWidth: isMobile ? '95%' : '500px',
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            padding: isMobile ? '30px 20px' : '40px',
            textAlign: 'center'
          }}>
            <div style={{ marginBottom: '32px' }}>
              <div style={{
                width: isMobile ? '60px' : '80px',
                height: isMobile ? '60px' : '80px',
                backgroundColor: '#16a34a',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}>
                <Play style={{ color: 'white' }} size={isMobile ? 30 : 40} />
              </div>
              <h2 style={{ 
                fontSize: isMobile ? '24px' : '32px', 
                fontWeight: 'bold', 
                color: '#16a34a',
                margin: '0 0 8px 0'
              }}>
                Boa Viagem!
              </h2>
              <p style={{ color: '#6b7280', marginBottom: '4px', fontSize: isMobile ? '14px' : '16px' }}>
                Viagem de {dadosViagem.origem} para {dadosViagem.destino}
              </p>
              <p style={{ fontSize: isMobile ? '12px' : '14px', color: '#9ca3af' }}>
                Ônibus: {dadosViagem.prefixo} | Motorista: {dadosViagem.motorista}
              </p>
            </div>

            <button
              onClick={finalizarViagem}
              style={{
                width: '100%',
                backgroundColor: '#dc2626',
                color: 'white',
                padding: isMobile ? '18px 16px' : '16px',
                borderRadius: '8px',
                fontSize: isMobile ? '18px' : '16px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                WebkitAppearance: 'none',
                appearance: 'none'
              }}
            >
              <Square size={isMobile ? 20 : 24} />
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
          padding: isMobile ? '10px' : '16px'
        }}>
          <div style={{
            maxWidth: isMobile ? '95%' : '500px',
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            padding: isMobile ? '20px' : '32px'
          }}>
            <h2 style={{ 
              fontSize: isMobile ? '20px' : '24px', 
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
                inputMode="numeric"
                value={dadosViagem.kmFinal}
                onChange={(e) => handleInputChange('kmFinal', e.target.value)}
                placeholder="Quilometragem final"
                style={{
                  ...mobileStyles.input,
                  border: kmInvalido ? '1px solid #dc2626' : '1px solid #d1d5db',
                  backgroundColor: kmInvalido ? '#fef2f2' : 'white'
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
                  ...mobileStyles.input,
                  height: isMobile ? '100px' : '80px',
                  resize: 'none'
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
                  ...mobileStyles.input,
                  height: isMobile ? '100px' : '80px',
                  resize: 'none'
                }}
              />
            </div>

            <div style={{ 
              backgroundColor: '#f9fafb', 
              padding: isMobile ? '12px' : '16px', 
              borderRadius: '8px',
              marginBottom: '24px'
            }}>
              <h4 style={{ fontWeight: '600', color: '#374151', marginBottom: '8px', fontSize: isMobile ? '14px' : '16px' }}>Resumo da Viagem:</h4>
              <div style={{ fontSize: isMobile ? '13px' : '14px', lineHeight: '1.6' }}>
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
                padding: isMobile ? '18px 16px' : '16px',
                borderRadius: '8px',
                fontSize: isMobile ? '18px' : '16px',
                fontWeight: '600',
                color: 'white',
                border: 'none',
                cursor: (kmInvalido || !dadosViagem.kmFinal) ? 'not-allowed' : 'pointer',
                backgroundColor: (kmInvalido || !dadosViagem.kmFinal) ? '#9ca3af' : '#2563eb',
                WebkitAppearance: 'none',
                appearance: 'none'
              }}
            >
              {kmInvalido ? 'Corrija o KM Final' : 'Concluir Viagem'}
            </button>
          </div>
        </div>
      );
    }

    if (etapa === 'concluida') {
      const itensNaoConformes = checklist.filter(item => item.status === 'nao-conforme');
      const temProblemasGraves = itensNaoConformes.length > 0 || dadosViagem.ordemServico.trim() !== '';
      
      return (
        <div style={{ 
          minHeight: '100vh', 
          background: 'linear-gradient(135deg, #bfdbfe 0%, #dbeafe 100%)',
          padding: isMobile ? '10px' : '16px'
        }}>
          <header style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <h1 style={{ 
              fontSize: isMobile ? '18px' : '24px', 
              fontWeight: 'bold', 
              color: '#1e3a8a',
              margin: 0
            }}>
              {isMobile ? 'Controle de Viagem' : 'Sistema de Controle de Viagem'}
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
                fontSize: isMobile ? '14px' : '16px',
                padding: isMobile ? '8px' : '0'
              }}
            >
              <LogOut size={isMobile ? 18 : 20} />
              <span>Sair</span>
            </button>
          </header>
          
          <div style={{
            maxWidth: isMobile ? '95%' : '500px',
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            padding: isMobile ? '30px 20px' : '40px',
            textAlign: 'center'
          }}>
            <div style={{
              width: isMobile ? '60px' : '80px',
              height: isMobile ? '60px' : '80px',
              backgroundColor: temProblemasGraves ? '#f59e0b' : '#2563eb',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}>
              {temProblemasGraves ? (
                <AlertTriangle style={{ color: 'white' }} size={isMobile ? 30 : 40} />
              ) : (
                <CheckCircle style={{ color: 'white' }} size={isMobile ? 30 : 40} />
              )}
            </div>
            <h2 style={{ 
              fontSize: isMobile ? '20px' : '24px', 
              fontWeight: 'bold', 
              color: temProblemasGraves ? '#f59e0b' : '#2563eb',
              marginBottom: '16px'
            }}>
              Viagem Concluída!
            </h2>
            
            {temProblemasGraves ? (
              <div style={{
                backgroundColor: '#fffbeb',
                border: '1px solid #fed7aa',
                borderRadius: '8px',
                padding: isMobile ? '12px' : '16px',
                marginBottom: '24px',
                textAlign: 'left'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <Wrench style={{ color: '#f59e0b', marginRight: '8px' }} size={20} />
                  <strong style={{ color: '#92400e', fontSize: isMobile ? '14px' : '16px' }}>Veículo Enviado para Manutenção</strong>
                </div>
                <p style={{ color: '#92400e', fontSize: isMobile ? '13px' : '14px', margin: '0 0 8px 0' }}>
                  Foram detectados problemas que necessitam atenção:
                </p>
                <ul style={{ color: '#92400e', fontSize: isMobile ? '12px' : '13px', margin: '0', paddingLeft: '20px' }}>
                  {itensNaoConformes.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '4px' }}>
                      <strong>{item.item}:</strong> {item.observacao || 'Não conforme'}
                    </li>
                  ))}
                  {dadosViagem.ordemServico.trim() && (
                    <li style={{ marginBottom: '4px' }}>
                      <strong>OS Manual:</strong> {dadosViagem.ordemServico.substring(0, 50)}...
                    </li>
                  )}
                </ul>
                <div style={{ 
                  marginTop: '12px', 
                  padding: '8px', 
                  backgroundColor: '#fef3c7', 
                  borderRadius: '4px',
                  fontSize: isMobile ? '11px' : '12px',
                  color: '#92400e'
                }}>
                  🔧 O veículo {dadosViagem.prefixo} foi automaticamente colocado em manutenção e não estará disponível até a liberação.
                </div>
              </div>
            ) : (
              <p style={{ color: '#6b7280', marginBottom: '24px', fontSize: isMobile ? '14px' : '16px' }}>
                Todos os dados foram salvos com sucesso. Nenhum problema detectado!
              </p>
            )}
            
            <div style={{ 
              backgroundColor: '#f9fafb', 
              padding: isMobile ? '12px' : '16px', 
              borderRadius: '8px',
              marginBottom: '24px',
              textAlign: 'left'
            }}>
              <h4 style={{ fontWeight: '600', color: '#374151', marginBottom: '8px', fontSize: isMobile ? '14px' : '16px' }}>Relatório Final:</h4>
              <div style={{ fontSize: isMobile ? '13px' : '14px', lineHeight: '1.6' }}>
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
                padding: isMobile ? '18px 16px' : '16px',
                borderRadius: '8px',
                fontSize: isMobile ? '18px' : '16px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                WebkitAppearance: 'none',
                appearance: 'none'
              }}
            >
              Nova Viagem
            </button>
          </div>
        </div>
      );
    }
  }

  // Dashboards simplificados para outras telas (admin, manutenção, gerência)
  if (tela === 'dashboard-admin' || tela === 'dashboard-manutencao' || tela === 'dashboard-gerencia') {
    const motoristas = usuarios.filter(u => u.tipo === 'motorista');
    const viagensComProblemas = viagens.filter(v => v.temProblemas).length;
    const veiculosManutencao = veiculos.filter(v => v.status === 'manutencao').length;
    const totalKm = viagens.reduce((total, viagem) => total + viagem.kmPercorridos, 0);
    
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
        <header style={{ 
          backgroundColor: 'white', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          padding: isMobile ? '12px 0' : '16px 0'
        }}>
          <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: isMobile ? '0 16px' : '0 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h1 style={{ 
              fontSize: isMobile ? '18px' : '24px', 
              fontWeight: 'bold', 
              color: '#1f2937',
              margin: 0
            }}>
              {tela === 'dashboard-admin' && 'Painel Admin'}
              {tela === 'dashboard-manutencao' && 'Painel Manutenção'}
              {tela === 'dashboard-gerencia' && 'Painel Gerencial'}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ color: '#6b7280', fontSize: isMobile ? '14px' : '16px' }}>Olá, {usuarioLogado}</span>
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
                  fontSize: isMobile ? '14px' : '16px'
                }}
              >
                <LogOut size={isMobile ? 18 : 20} />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </header>

        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: isMobile ? '16px' : '24px' 
        }}>
          {/* Cards de estatísticas */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: isMobile ? '12px' : '24px',
            marginBottom: '32px'
          }}>
            <div style={{ 
              backgroundColor: 'white', 
              padding: isMobile ? '16px' : '24px', 
              borderRadius: '8px', 
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Users style={{ 
                  color: '#2563eb', 
                  marginRight: isMobile ? '8px' : '12px' 
                }} size={isMobile ? 24 : 32} />
                <div>
                  <h3 style={{ 
                    fontSize: isMobile ? '14px' : '18px', 
                    fontWeight: '600', 
                    margin: 0 
                  }}>Motoristas</h3>
                  <p style={{ 
                    fontSize: isMobile ? '18px' : '24px', 
                    fontWeight: 'bold', 
                    color: '#2563eb', 
                    margin: '4px 0 0 0' 
                  }}>
                    {motoristas.length}
                  </p>
                </div>
              </div>
            </div>
            
            <div style={{ 
              backgroundColor: 'white', 
              padding: isMobile ? '16px' : '24px', 
              borderRadius: '8px', 
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Truck style={{ 
                  color: '#059669', 
                  marginRight: isMobile ? '8px' : '12px' 
                }} size={isMobile ? 24 : 32} />
                <div>
                  <h3 style={{ 
                    fontSize: isMobile ? '14px' : '18px', 
                    fontWeight: '600', 
                    margin: 0 
                  }}>Veículos</h3>
                  <p style={{ 
                    fontSize: isMobile ? '18px' : '24px', 
                    fontWeight: 'bold', 
                    color: '#059669', 
                    margin: '4px 0 0 0' 
                  }}>
                    {veiculos.length}
                  </p>
                  {veiculosManutencao > 0 && (
                    <p style={{ fontSize: '10px', color: '#dc2626', margin: '2px 0 0 0' }}>
                      {veiculosManutencao} em manutenção
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div style={{ 
              backgroundColor: 'white', 
              padding: isMobile ? '16px' : '24px', 
              borderRadius: '8px', 
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FileText style={{ 
                  color: '#ea580c', 
                  marginRight: isMobile ? '8px' : '12px' 
                }} size={isMobile ? 24 : 32} />
                <div>
                  <h3 style={{ 
                    fontSize: isMobile ? '14px' : '18px', 
                    fontWeight: '600', 
                    margin: 0 
                  }}>Viagens</h3>
                  <p style={{ 
                    fontSize: isMobile ? '18px' : '24px', 
                    fontWeight: 'bold', 
                    color: '#ea580c', 
                    margin: '4px 0 0 0' 
                  }}>
                    {viagens.length}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ 
              backgroundColor: 'white', 
              padding: isMobile ? '16px' : '24px', 
              borderRadius: '8px', 
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <AlertTriangle style={{ 
                  color: '#dc2626', 
                  marginRight: isMobile ? '8px' : '12px' 
                }} size={isMobile ? 24 : 32} />
                <div>
                  <h3 style={{ 
                    fontSize: isMobile ? '14px' : '18px', 
                    fontWeight: '600', 
                    margin: 0 
                  }}>Ocorrências</h3>
                  <p style={{ 
                    fontSize: isMobile ? '18px' : '24px', 
                    fontWeight: 'bold', 
                    color: '#dc2626', 
                    margin: '4px 0 0 0' 
                  }}>
                    {viagensComProblemas}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Lista simplificada de viagens */}
          {viagens.length > 0 && (
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
              padding: isMobile ? '16px' : '24px'
            }}>
              <h2 style={{ 
                fontSize: isMobile ? '16px' : '20px', 
                fontWeight: 'bold', 
                marginBottom: '16px', 
                display: 'flex', 
                alignItems: 'center' 
              }}>
                <FileText style={{ marginRight: '8px' }} size={isMobile ? 18 : 24} />
                Últimas Viagens
              </h2>
              
              <div style={{ 
                display: 'grid', 
                gap: isMobile ? '8px' : '12px',
                maxHeight: '400px',
                overflowY: 'auto'
              }}>
                {viagens.slice(-5).reverse().map(viagem => (
                  <div key={viagem.id} style={{ 
                    padding: isMobile ? '12px' : '16px', 
                    backgroundColor: viagem.temProblemas ? '#fef2f2' : '#f9fafb', 
                    borderRadius: '8px',
                    border: viagem.temProblemas ? '1px solid #fecaca' : '1px solid #e5e7eb'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start',
                      marginBottom: '8px',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      <strong style={{ fontSize: isMobile ? '14px' : '16px' }}>{viagem.motorista}</strong>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: isMobile ? '11px' : '12px', color: '#6b7280' }}>{viagem.dataHora}</span>
                        {viagem.temProblemas && (
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            color: '#dc2626',
                            fontSize: isMobile ? '11px' : '12px'
                          }}>
                            <AlertTriangle size={12} style={{ marginRight: '2px' }} />
                            <span>Problemas</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <p style={{ 
                      margin: '4px 0', 
                      fontSize: isMobile ? '13px' : '14px',
                      color: '#6b7280'
                    }}>
                      <strong>Rota:</strong> {viagem.origem} → {viagem.destino}
                    </p>
                    <p style={{ 
                      margin: '4px 0', 
                      fontSize: isMobile ? '13px' : '14px',
                      color: '#6b7280'
                    }}>
                      <strong>Veículo:</strong> {viagem.prefixo} | <strong>KM:</strong> {viagem.kmPercorridos} km
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default App;
