import React, { useState, useMemo, useEffect } from 'react';
import { Camera, CheckCircle, XCircle, Play, Square, FileText, Wrench, Users, Truck, Settings, LogOut, Eye, Plus, Edit2, Trash2, AlertTriangle, ArrowLeft, MapPin, Clock, User, Search, Filter, BarChart3, TrendingUp, Activity, Bell, Menu, X } from 'lucide-react';

const App = () => {
  const [usuario, setUsuario] = useState({
    nome: null,
    tipo: null,
    tela: 'login'
  });
  const [modalAtivo, setModalAtivo] = useState(null);
  const [sidebarAberta, setSidebarAberta] = useState(false);
  
  // Estados para dados
  const [credenciaisAdmin] = useState({
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
      status: 'ativo',
      ultimoKm: 52450,
      kmProximaRevisao: 60000,
      intervaloRevisao: 10000
    },
    { 
      id: 2, 
      prefixo: '1002', 
      placa: 'DEF-5678', 
      modelo: 'Volvo B270F', 
      status: 'ativo',
      ultimoKm: 45200,
      kmProximaRevisao: 50000,
      intervaloRevisao: 10000
    },
    { 
      id: 3, 
      prefixo: '1003', 
      placa: 'GHI-9012', 
      modelo: 'Scania K270', 
      status: 'manutencao',
      ultimoKm: 50450,
      kmProximaRevisao: 55000,
      intervaloRevisao: 8000
    }
  ]);
  
  const [cidades, setCidades] = useState([
    { id: 1, nome: 'São Paulo', uf: 'SP' },
    { id: 2, nome: 'Rio de Janeiro', uf: 'RJ' },
    { id: 3, nome: 'Belo Horizonte', uf: 'MG' },
    { id: 4, nome: 'Salvador', uf: 'BA' },
    { id: 5, nome: 'Brasília', uf: 'DF' }
  ]);
  
  const [itensChecklist, setItensChecklist] = useState([
    { id: 1, nome: 'Pneus', obrigatorio: true },
    { id: 2, nome: 'Freios', obrigatorio: true },
    { id: 3, nome: 'Luzes', obrigatorio: true },
    { id: 4, nome: 'Portas', obrigatorio: true },
    { id: 5, nome: 'Interior', obrigatorio: true },
    { id: 6, nome: 'Extintor', obrigatorio: true },
    { id: 7, nome: 'Documentação', obrigatorio: true },
    { id: 8, nome: 'Limpeza', obrigatorio: false }
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
  
  // Estado para veículos com revisão concluída aguardando parametrização
  const [veiculosRevisaoConcluida, setVeiculosRevisaoConcluida] = useState([]);
  
  // Estados do formulário de login
  const [loginUsuario, setLoginUsuario] = useState('');
  const [loginSenha, setLoginSenha] = useState('');
  
  // Estados para formulários
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senhaUsuario, setSenhaUsuario] = useState('');
  const [tipoUsuarioNovo, setTipoUsuarioNovo] = useState('motorista');
  
  const [prefixoVeiculo, setPrefixoVeiculo] = useState('');
  const [placaVeiculo, setPlacaVeiculo] = useState('');
  const [modeloVeiculo, setModeloVeiculo] = useState('');
  const [kmAtualVeiculo, setKmAtualVeiculo] = useState('');
  const [intervaloRevisaoVeiculo, setIntervaloRevisaoVeiculo] = useState('10000');
  
  // Estados para edição de veículos
  const [veiculoEditando, setVeiculoEditando] = useState(null);
  const [editKmAtual, setEditKmAtual] = useState('');
  const [editIntervaloRevisao, setEditIntervaloRevisao] = useState('');
  const [editKmProximaRevisao, setEditKmProximaRevisao] = useState('');
  
  const [nomeCidade, setNomeCidade] = useState('');
  const [ufCidade, setUfCidade] = useState('');
  
  const [nomeItemChecklist, setNomeItemChecklist] = useState('');
  const [obrigatorioItemChecklist, setObrigatorioItemChecklist] = useState(true);

  // Estados para controle de viagem (MOTORISTA)
  const [etapaViagem, setEtapaViagem] = useState('inicial');
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
  const [checklistViagem, setChecklistViagem] = useState([]);
  const [sugestoesOrigem, setSugestoesOrigem] = useState([]);
  const [sugestoesDestino, setSugestoesDestino] = useState([]);
  const [mostrarSugestoesOrigem, setMostrarSugestoesOrigem] = useState(false);
  const [mostrarSugestoesDestino, setMostrarSugestoesDestino] = useState(false);

  // Funções básicas
  const fazerLogin = () => {
    // Verificar se é admin primeiro
    if (loginUsuario === credenciaisAdmin.usuario && loginSenha === credenciaisAdmin.senha) {
      setUsuario({
        nome: 'Administrador',
        tipo: 'admin',
        tela: 'dashboard-admin'
      });
      return;
    }
    
    // Buscar usuário normal
    const usuarioEncontrado = usuarios.find(u => 
      u.nome.toLowerCase() === loginUsuario.toLowerCase() && 
      u.senha === loginSenha &&
      u.status === 'ativo'
    );
    
    if (usuarioEncontrado) {
      let telaDestino = 'dashboard-admin'; // default
      
      if (usuarioEncontrado.tipo === 'motorista') {
        telaDestino = 'dashboard-motorista';
      } else if (usuarioEncontrado.tipo === 'manutencao') {
        telaDestino = 'dashboard-manutencao';
      } else if (usuarioEncontrado.tipo === 'gerencia') {
        telaDestino = 'dashboard-gerencia';
      }
      
      setUsuario({
        nome: usuarioEncontrado.nome,
        tipo: usuarioEncontrado.tipo,
        tela: telaDestino
      });
    } else {
      alert('Usuário ou senha incorretos!');
    }
  };

  const logout = () => {
    setUsuario({
      nome: null,
      tipo: null,
      tela: 'login'
    });
    setLoginUsuario('');
    setLoginSenha('');
    setModalAtivo(null);
    setSidebarAberta(false);
  };

  const adicionarUsuario = () => {
    if (nomeUsuario && senhaUsuario) {
      const novoId = Math.max(...usuarios.map(u => u.id), 0) + 1;
      setUsuarios([...usuarios, { 
        id: novoId, 
        nome: nomeUsuario, 
        senha: senhaUsuario, 
        tipo: tipoUsuarioNovo, 
        status: 'ativo' 
      }]);
      setNomeUsuario('');
      setSenhaUsuario('');
      setTipoUsuarioNovo('motorista');
    }
  };

  const adicionarVeiculo = () => {
    if (prefixoVeiculo && placaVeiculo && modeloVeiculo && kmAtualVeiculo && intervaloRevisaoVeiculo) {
      const novoId = Math.max(...veiculos.map(v => v.id), 0) + 1;
      const kmAtual = parseInt(kmAtualVeiculo);
      const intervalo = parseInt(intervaloRevisaoVeiculo);
      const proximaRevisao = kmAtual + intervalo;
      
      setVeiculos([...veiculos, { 
        id: novoId, 
        prefixo: prefixoVeiculo, 
        placa: placaVeiculo, 
        modelo: modeloVeiculo,
        ultimoKm: kmAtual,
        kmProximaRevisao: proximaRevisao,
        intervaloRevisao: intervalo,
        status: 'ativo' 
      }]);
      setPrefixoVeiculo('');
      setPlacaVeiculo('');
      setModeloVeiculo('');
      setKmAtualVeiculo('');
      setIntervaloRevisaoVeiculo('10000');
    }
  };

  const adicionarCidade = () => {
    if (nomeCidade && ufCidade) {
      const novoId = Math.max(...cidades.map(c => c.id), 0) + 1;
      setCidades([...cidades, { 
        id: novoId, 
        nome: nomeCidade, 
        uf: ufCidade 
      }]);
      setNomeCidade('');
      setUfCidade('');
    }
  };

  const adicionarItemChecklist = () => {
    if (nomeItemChecklist) {
      const novoId = Math.max(...itensChecklist.map(i => i.id), 0) + 1;
      setItensChecklist([...itensChecklist, { 
        id: novoId, 
        nome: nomeItemChecklist, 
        obrigatorio: obrigatorioItemChecklist 
      }]);
      setNomeItemChecklist('');
      setObrigatorioItemChecklist(true);
    }
  };

  const removerUsuario = (id) => {
    setUsuarios(usuarios.filter(u => u.id !== id));
  };

  const removerVeiculo = (id) => {
    setVeiculos(veiculos.filter(v => v.id !== id));
  };

  const iniciarEdicaoVeiculo = (veiculo) => {
    setVeiculoEditando(veiculo.id);
    setEditKmAtual(veiculo.ultimoKm?.toString() || '');
    setEditIntervaloRevisao(veiculo.intervaloRevisao?.toString() || '');
    setEditKmProximaRevisao(veiculo.kmProximaRevisao?.toString() || '');
  };

  const salvarEdicaoVeiculo = (id) => {
    const kmAtual = parseInt(editKmAtual) || 0;
    const intervalo = parseInt(editIntervaloRevisao) || 10000;
    let proximaRevisao = parseInt(editKmProximaRevisao) || 0;
    
    // Se não foi definida uma próxima revisão ou é menor que o KM atual, calcular automaticamente
    if (!proximaRevisao || proximaRevisao <= kmAtual) {
      proximaRevisao = kmAtual + intervalo;
    }
    
    setVeiculos(veiculos.map(v => 
      v.id === id 
        ? { 
            ...v, 
            ultimoKm: kmAtual,
            intervaloRevisao: intervalo,
            kmProximaRevisao: proximaRevisao
          }
        : v
    ));
    
    setVeiculoEditando(null);
    setEditKmAtual('');
    setEditIntervaloRevisao('');
    setEditKmProximaRevisao('');
    
    alert('✅ Parâmetros de KM atualizados com sucesso!');
  };

  const cancelarEdicaoVeiculo = () => {
    setVeiculoEditando(null);
    setEditKmAtual('');
    setEditIntervaloRevisao('');
    setEditKmProximaRevisao('');
  };

  const removerItemChecklist = (id) => {
    setItensChecklist(itensChecklist.filter(i => i.id !== id));
  };

  const liberarVeiculo = (id) => {
    const veiculo = veiculos.find(v => v.id === id);
    if (!veiculo) return;
    
    const problemasRestantes = viagens.filter(v => 
      v.prefixo === veiculo.prefixo && 
      ((v.itensNaoConformes?.some(item => !item.resolvido)) || 
       (v.ordemServico && v.ordemServico.trim() && v.statusManutencao !== 'resolvida'))
    );
    
    if (problemasRestantes.length > 0) {
      const confirmar = confirm(
        `⚠️ ATENÇÃO!\n\nO veículo ${veiculo.prefixo} ainda possui ${problemasRestantes.length} problema(s) não resolvido(s).\n\nTem certeza que deseja liberar o veículo mesmo assim?`
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
    
    alert('✅ Item do checklist resolvido!');
  };

  const processarOS = (viagemId) => {
    const viagem = viagens.find(v => v.id === viagemId);
    if (viagem) {
      setViagens(viagens.map(v => 
        v.id === viagemId ? { ...v, statusManutencao: 'resolvida' } : v
      ));
      
      alert(`✅ Ordem de serviço do veículo ${viagem.prefixo} foi processada!`);
    }
  };

  // Nova função para marcar revisão como concluída
  const marcarRevisaoConcluida = (veiculoId) => {
    const veiculo = veiculos.find(v => v.id === veiculoId);
    if (!veiculo) return;
    
    const confirmar = confirm(
      `🔧 REVISÃO CONCLUÍDA\n\nConfirma que a revisão do veículo ${veiculo.prefixo} foi realizada?\n\nIsso notificará o administrador para atualizar os parâmetros de quilometragem.`
    );
    
    if (confirmar) {
      // Adicionar à lista de veículos com revisão concluída
      const novaRevisao = {
        id: Math.random().toString(36).substr(2, 9),
        veiculoId: veiculo.id,
        prefixo: veiculo.prefixo,
        placa: veiculo.placa,
        modelo: veiculo.modelo,
        kmAtual: veiculo.ultimoKm,
        kmRevisaoAnterior: veiculo.kmProximaRevisao,
        intervaloAnterior: veiculo.intervaloRevisao,
        dataRevisao: new Date().toLocaleString(),
        responsavel: usuario.nome,
        novoKmSugerido: veiculo.ultimoKm + veiculo.intervaloRevisao, // Sugestão inteligente
        status: 'aguardando_parametrizacao'
      };
      
      setVeiculosRevisaoConcluida(prev => [...prev, novaRevisao]);
      
      alert(`✅ Revisão marcada como concluída!\n\nO administrador foi notificado para atualizar os parâmetros de quilometragem do veículo ${veiculo.prefixo}.`);
    }
  };

  // Função para o admin processar revisão concluída
  const processarRevisaoConcluida = (revisaoId, novoKmRevisao, novoIntervalo) => {
    const revisao = veiculosRevisaoConcluida.find(r => r.id === revisaoId);
    if (!revisao) return;
    
    // Atualizar o veículo com novos parâmetros
    setVeiculos(veiculos.map(v => 
      v.id === revisao.veiculoId 
        ? { 
            ...v, 
            kmProximaRevisao: parseInt(novoKmRevisao) || (v.ultimoKm + (parseInt(novoIntervalo) || v.intervaloRevisao)),
            intervaloRevisao: parseInt(novoIntervalo) || v.intervaloRevisao
          }
        : v
    ));
    
    // Remover da lista de revisões pendentes
    setVeiculosRevisaoConcluida(prev => prev.filter(r => r.id !== revisaoId));
    
    alert(`✅ Parâmetros de revisão atualizados com sucesso!\n\nVeículo ${revisao.prefixo} está pronto para operação.`);
  };

  // Função para rejeitar revisão (caso não tenha sido realmente feita)
  const rejeitarRevisaoConcluida = (revisaoId) => {
    const revisao = veiculosRevisaoConcluida.find(r => r.id === revisaoId);
    if (!revisao) return;
    
    const confirmar = confirm(
      `⚠️ REJEITAR REVISÃO\n\nTem certeza que deseja rejeitar a revisão do veículo ${revisao.prefixo}?\n\nIsso indicará que a revisão não foi realmente concluída.`
    );
    
    if (confirmar) {
      setVeiculosRevisaoConcluida(prev => prev.filter(r => r.id !== revisaoId));
      alert(`❌ Revisão rejeitada. O veículo ${revisao.prefixo} continua com status de revisão pendente.`);
    }
  };

  // Funções para controle de viagem (MOTORISTA)
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
    handleInputChangeViagem(tipo, nomeCompleto);
    
    if (tipo === 'origem') {
      setMostrarSugestoesOrigem(false);
    } else {
      setMostrarSugestoesDestino(false);
    }
  };

  const handleInputChangeViagem = (field, value) => {
    setDadosViagem(prev => ({ ...prev, [field]: value }));
  };

  const handleChecklistChangeViagem = (index, field, value) => {
    setChecklistViagem(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const iniciarViagem = () => {
    setEtapaViagem('viagem');
  };

  const finalizarViagem = () => {
    setEtapaViagem('finalizacao');
  };

  const concluirViagem = () => {
    const kmInicial = parseFloat(dadosViagem.kmInicial);
    const kmFinal = parseFloat(dadosViagem.kmFinal);
    
    if (!dadosViagem.kmFinal || kmFinal <= kmInicial) {
      alert('ERRO: O KM final deve ser maior que o KM inicial!');
      return;
    }
    
    const itensNaoConformes = checklistViagem.filter(item => item.status === 'nao-conforme');
    const temProblemas = itensNaoConformes.length > 0 || 
                        dadosViagem.diversidades.trim() !== '' || 
                        dadosViagem.ordemServico.trim() !== '';
    
    const novaViagem = {
      id: viagens.length + 1,
      ...dadosViagem,
      checklist: [...checklistViagem],
      dataHora: new Date().toLocaleString(),
      kmPercorridos: kmFinal - kmInicial,
      temProblemas,
      itensNaoConformes: itensNaoConformes.map(item => ({
        ...item,
        resolvido: false,
        id: Math.random().toString(36).substr(2, 9)
      }))
    };
    
    setViagens([...viagens, novaViagem]);
    
    // Atualizar KM do veículo mas NÃO atualizar a próxima revisão automaticamente
    setVeiculos(prevVeiculos => prevVeiculos.map(veiculo => {
      if (veiculo.prefixo === dadosViagem.prefixo) {
        const novoKm = kmFinal;
        
        // IMPORTANTE: NÃO atualizar a próxima revisão automaticamente
        // A revisão só deve ser atualizada quando a manutenção for feita
        return {
          ...veiculo,
          ultimoKm: novoKm,
          // kmProximaRevisao permanece igual - só muda quando manutenção fizer a revisão
          status: itensNaoConformes.length > 0 ? 'manutencao' : veiculo.status
        };
      }
      return veiculo;
    }));
    
    if (itensNaoConformes.length > 0) {
      alert(`⚠️ Viagem concluída!\n\nVeículo ${dadosViagem.prefixo} foi automaticamente colocado em manutenção devido aos itens não conformes encontrados.`);
    } else if (dadosViagem.ordemServico.trim()) {
      alert('✅ Viagem concluída!\n\n⚠️ Ordem de serviço registrada para o veículo.');
    } else {
      alert('✅ Viagem concluída com sucesso!');
    }
    
    setEtapaViagem('concluida');
  };

  const novaViagem = () => {
    setEtapaViagem('inicial');
    setDadosViagem({
      motorista: usuario.nome,
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
    setChecklistViagem(checklistInicial);
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
           checklistViagem.every(item => item.obrigatorio ? item.status !== 'pendente' : true);
  };

  // Dados calculados
  const estatisticas = useMemo(() => {
    const problemasAtivos = viagens.reduce((total, viagem) => {
      const itensNaoResolvidos = viagem.itensNaoConformes?.filter(item => !item.resolvido)?.length || 0;
      const osNaoResolvida = (viagem.ordemServico && viagem.ordemServico.trim() && viagem.statusManutencao !== 'resolvida') ? 1 : 0;
      return total + itensNaoResolvidos + osNaoResolvida;
    }, 0);

    const totalKm = viagens.reduce((total, viagem) => total + viagem.kmPercorridos, 0);
    const veiculosManutencao = veiculos.filter(v => v.status === 'manutencao').length;

    return {
      totalUsuarios: usuarios.length,
      totalVeiculos: veiculos.length,
      totalCidades: cidades.length,
      totalViagens: viagens.length,
      totalItensChecklist: itensChecklist.length,
      problemasAtivos,
      totalKm,
      veiculosManutencao,
      revisoesPendentes: veiculosRevisaoConcluida.length
    };
  }, [usuarios, veiculos, cidades, viagens, itensChecklist, veiculosRevisaoConcluida]);

  // CSS básico como string
  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    fontSize: '16px',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s ease'
  };

  const buttonStyle = {
    width: '100%',
    padding: '14px 20px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white'
  };

  const buttonSecondaryStyle = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    color: '#374151'
  };

  const buttonDangerStyle = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
    width: 'auto',
    padding: '8px 12px'
  };

  // Handle do Enter no login e scroll para mobile
  const handleLoginKeyPress = (e) => {
    if (e.key === 'Enter') {
      fazerLogin();
    }
  };

  // Função para scroll automático em mobile
  const handleMobileFocus = () => {
    // Detectar se é mobile
    const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 300); // Delay para aguardar o teclado aparecer
    }
  };

  // useEffect para melhorar experiência mobile
  useEffect(() => {
    // Prevenir zoom em iOS quando focando inputs
    const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
    inputs.forEach(input => {
      input.addEventListener('focus', handleMobileFocus);
    });

    return () => {
      inputs.forEach(input => {
        input.removeEventListener('focus', handleMobileFocus);
      });
    };
  }, [usuario.tela]);

  // TELA DE LOGIN
  if (usuario.tela === 'login') {
    return (
      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        // Melhorias para mobile
        paddingTop: '40px',
        paddingBottom: '40px'
      }}>
        <div style={{
          maxWidth: '400px',
          width: '100%',
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
          // Ajustes para mobile
          margin: '0 auto',
          transform: 'translateY(0)', // Garante posicionamento correto
          position: 'relative'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto'
            }}>
              <Truck style={{ width: '40px', height: '40px', color: 'white' }} />
            </div>
            <h1 style={{ 
              fontSize: '28px', 
              fontWeight: '700', 
              color: '#1f2937',
              margin: '0 0 8px 0'
            }}>
              Sistema de Viagens
            </h1>
            <p style={{ 
              color: '#6b7280', 
              fontSize: '16px',
              margin: 0
            }}>
              Controle de Frota Inteligente
            </p>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Nome do usuário"
              value={loginUsuario}
              onChange={(e) => setLoginUsuario(e.target.value)}
              onKeyPress={handleLoginKeyPress}
              onFocus={handleMobileFocus}
              style={{
                ...inputStyle,
                fontSize: '16px', // Previne zoom no iOS
                WebkitAppearance: 'none' // Remove estilo padrão iOS
              }}
            />
          </div>
          
          <div style={{ marginBottom: '30px' }}>
            <input
              type="password"
              placeholder="Senha"
              value={loginSenha}
              onChange={(e) => setLoginSenha(e.target.value)}
              onKeyPress={handleLoginKeyPress}
              onFocus={handleMobileFocus}
              style={{
                ...inputStyle,
                fontSize: '16px', // Previne zoom no iOS
                WebkitAppearance: 'none' // Remove estilo padrão iOS
              }}
            />
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <button
              onClick={fazerLogin}
              style={{
                ...buttonStyle,
                // Melhorias para mobile
                minHeight: '48px', // Altura mínima para touch
                fontSize: '16px'
              }}
            >
              Entrar no Sistema
            </button>
          </div>
          
          <div style={{ 
            fontSize: '12px', 
            color: '#6b7280', 
            textAlign: 'center',
            lineHeight: '1.5',
            padding: '16px',
            backgroundColor: '#f9fafb',
            borderRadius: '12px'
          }}>
            <p style={{ margin: '2px 0', fontWeight: '500' }}>Contas de Demonstração:</p>
            <p style={{ margin: '2px 0' }}>🔑 <strong>Admin:</strong> admin / admin123</p>
            <p style={{ margin: '2px 0' }}>🚗 <strong>Motorista:</strong> João Silva / 123456</p>
            <p style={{ margin: '2px 0' }}>🔧 <strong>Manutenção:</strong> Carlos Manutenção / manut123</p>
          </div>
        </div>
      </div>
    );
  }

  // DASHBOARD MOTORISTA
  if (usuario.tela === 'dashboard-motorista') {
    // Inicializar dados da viagem se necessário
    if (dadosViagem.motorista === '') {
      setDadosViagem(prev => ({ ...prev, motorista: usuario.nome }));
      const checklistInicial = itensChecklist.map(item => ({
        item: item.nome,
        status: 'pendente',
        foto: false,
        observacao: '',
        obrigatorio: item.obrigatorio
      }));
      setChecklistViagem(checklistInicial);
    }

    if (etapaViagem === 'inicial') {
      return (
        <div style={{ 
          minHeight: '100vh', 
          background: 'linear-gradient(135deg, #bfdbfe 0%, #dbeafe 100%)',
          padding: '16px',
          fontFamily: 'system-ui, -apple-system, sans-serif'
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
                color: 'white',
                background: buttonDangerStyle.background,
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
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
                  ...inputStyle,
                  backgroundColor: '#f3f4f6',
                  color: '#6b7280'
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
                    handleInputChangeViagem('origem', e.target.value);
                    buscarCidades(e.target.value, 'origem');
                  }}
                  onBlur={() => setTimeout(() => setMostrarSugestoesOrigem(false), 300)}
                  onFocus={() => {
                    if (dadosViagem.origem.length >= 2) {
                      buscarCidades(dadosViagem.origem, 'origem');
                    }
                  }}
                  placeholder="Digite ou selecione a origem"
                  style={inputStyle}
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
                    handleInputChangeViagem('destino', e.target.value);
                    buscarCidades(e.target.value, 'destino');
                  }}
                  onBlur={() => setTimeout(() => setMostrarSugestoesDestino(false), 300)}
                  onFocus={() => {
                    if (dadosViagem.destino.length >= 2) {
                      buscarCidades(dadosViagem.destino, 'destino');
                    }
                  }}
                  placeholder="Digite ou selecione o destino"
                  style={inputStyle}
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
                  onChange={(e) => handleInputChangeViagem('prefixo', e.target.value)}
                  style={inputStyle}
                >
                  <option value="">Selecione</option>
                  {veiculos.map(veiculo => (
                    <option key={veiculo.id} value={veiculo.prefixo}>
                      {veiculo.prefixo} - {veiculo.placa} {veiculo.status === 'manutencao' ? '(⚠️ Em Manutenção)' : ''}
                    </option>
                  ))}
                </select>
                
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
                  onChange={(e) => handleInputChangeViagem('kmInicial', e.target.value)}
                  placeholder="KM"
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Checklist */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
                Checklist de Verificação
              </h3>
              <div>
                {checklistViagem.map((item, index) => (
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
                          onClick={() => handleChecklistChangeViagem(index, 'status', 'conforme')}
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
                          onClick={() => handleChecklistChangeViagem(index, 'status', 'nao-conforme')}
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
                          onClick={() => handleChecklistChangeViagem(index, 'foto', !item.foto)}
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
                        onChange={(e) => handleChecklistChangeViagem(index, 'observacao', e.target.value)}
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

    if (etapaViagem === 'viagem') {
      return (
        <div style={{ 
          minHeight: '100vh', 
          background: 'linear-gradient(135deg, #bbf7d0 0%, #dcfce7 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          fontFamily: 'system-ui, -apple-system, sans-serif'
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

    if (etapaViagem === 'finalizacao') {
      const kmInicial = parseFloat(dadosViagem.kmInicial);
      const kmFinal = parseFloat(dadosViagem.kmFinal);
      const kmInvalido = dadosViagem.kmFinal && kmFinal <= kmInicial;
      
      return (
        <div style={{ 
          minHeight: '100vh', 
          background: 'linear-gradient(135deg, #fed7aa 0%, #fef3c7 100%)',
          padding: '16px',
          fontFamily: 'system-ui, -apple-system, sans-serif'
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
                onChange={(e) => handleInputChangeViagem('kmFinal', e.target.value)}
                placeholder="Quilometragem final"
                style={{
                  ...inputStyle,
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
                onChange={(e) => handleInputChangeViagem('diversidades', e.target.value)}
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
                onChange={(e) => handleInputChangeViagem('ordemServico', e.target.value)}
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

    if (etapaViagem === 'concluida') {
      return (
        <div style={{ 
          minHeight: '100vh', 
          background: 'linear-gradient(135deg, #bfdbfe 0%, #dbeafe 100%)',
          padding: '16px',
          fontFamily: 'system-ui, -apple-system, sans-serif'
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
                color: 'white',
                background: buttonDangerStyle.background,
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
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
                
                {checklistViagem.filter(item => item.status === 'nao-conforme').length > 0 && (
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
                    {checklistViagem.filter(item => item.status === 'nao-conforme').map((item, idx) => (
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

    return null;
  }

  // DASHBOARD MANUTENÇÃO
  if (usuario.tela === 'dashboard-manutencao') {
    const veiculosManutencao = veiculos.filter(v => v.status === 'manutencao');
    const viagensComOS = viagens.filter(v => 
      v.ordemServico && 
      v.ordemServico.trim() !== '' && 
      v.statusManutencao !== 'resolvida'
    );
    const veiculosRevisaoProxima = veiculos.filter(v => {
      const kmParaRevisao = v.kmProximaRevisao - v.ultimoKm;
      return kmParaRevisao <= 1000;
    });
    
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f8fafc',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
          padding: '24px',
          color: 'white'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 8px 0' }}>
                Painel de Manutenção
              </h1>
              <p style={{ fontSize: '18px', margin: 0, opacity: 0.9 }}>
                Olá, {usuario.nome}! Gerencie a manutenção da frota.
              </p>
            </div>
            <button
              onClick={logout}
              style={{
                ...buttonDangerStyle,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <LogOut size={18} />
              Sair
            </button>
          </div>
        </div>
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px' }}>
          {/* Notificações de Revisão */}
          {(() => {
            const veiculosRevisaoProxima = veiculos.filter(v => {
              const kmParaRevisao = v.kmProximaRevisao - v.ultimoKm;
              return kmParaRevisao <= 1000 && v.status === 'ativo';
            });

            if (veiculosRevisaoProxima.length > 0) {
              return (
                <div style={{
                  backgroundColor: '#fef2f2',
                  border: '2px solid #fca5a5',
                  borderRadius: '16px',
                  padding: '20px',
                  marginBottom: '24px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#dc2626',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Bell style={{ color: 'white' }} size={20} />
                    </div>
                    <div>
                      <h3 style={{ margin: 0, color: '#991b1b', fontSize: '18px', fontWeight: '600' }}>
                        🔔 Notificações de Revisão
                      </h3>
                      <p style={{ margin: 0, color: '#7f1d1d', fontSize: '14px' }}>
                        {veiculosRevisaoProxima.length} veículo(s) próximo(s) da revisão
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {veiculosRevisaoProxima.map(veiculo => {
                      const kmParaRevisao = veiculo.kmProximaRevisao - veiculo.ultimoKm;
                      
                      return (
                        <div key={veiculo.id} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '16px',
                          backgroundColor: '#fee2e2',
                          borderRadius: '12px',
                          border: '1px solid #fecaca'
                        }}>
                          <div>
                            <h4 style={{ margin: '0 0 4px 0', color: '#991b1b', fontWeight: '600' }}>
                              {veiculo.prefixo} - {veiculo.placa}
                            </h4>
                            <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#7f1d1d' }}>
                              {veiculo.modelo}
                            </p>
                            <div style={{ fontSize: '12px', color: '#7f1d1d' }}>
                              <span>KM Atual: {veiculo.ultimoKm?.toLocaleString()}</span>
                              <span style={{ marginLeft: '12px' }}>
                                Revisão em: {veiculo.kmProximaRevisao?.toLocaleString()} km
                              </span>
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ 
                              fontSize: '16px', 
                              fontWeight: 'bold', 
                              color: kmParaRevisao <= 0 ? '#dc2626' : '#f59e0b'
                            }}>
                              {kmParaRevisao <= 0 ? 'VENCIDA' : `${kmParaRevisao} km`}
                            </div>
                            <div style={{ fontSize: '12px', color: '#7f1d1d', marginBottom: '8px' }}>
                              {kmParaRevisao <= 0 ? 'Revisão em atraso' : 'Faltam para revisão'}
                            </div>
                            {/* Botão para marcar revisão como concluída */}
                            <button
                              onClick={() => marcarRevisaoConcluida(veiculo.id)}
                              style={{
                                ...buttonStyle,
                                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                                padding: '6px 12px',
                                fontSize: '11px',
                                width: 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                marginTop: '4px'
                              }}
                            >
                              <CheckCircle size={12} />
                              Revisão Concluída
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }
            return null;
          })()}

          {/* Cards de Resumo */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            marginBottom: '32px'
          }}>
            {/* Card Veículos em Manutenção */}
            <div style={{
              background: 'linear-gradient(135deg, #dc2626 0%, #f97316 100%)',
              padding: '24px',
              borderRadius: '16px',
              color: 'white',
              boxShadow: '0 8px 25px rgba(220, 38, 38, 0.25)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', opacity: 0.9 }}>Veículos em Manutenção</h3>
                  <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>{veiculosManutencao.length}</p>
                </div>
                <Wrench size={40} style={{ opacity: 0.3 }} />
              </div>
            </div>

            {/* Card Ordens de Serviço */}
            <div style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #eab308 100%)',
              padding: '24px',
              borderRadius: '16px',
              color: 'white',
              boxShadow: '0 8px 25px rgba(245, 158, 11, 0.25)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', opacity: 0.9 }}>Ordens de Serviço</h3>
                  <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>{viagensComOS.length}</p>
                </div>
                <FileText size={40} style={{ opacity: 0.3 }} />
              </div>
            </div>

            {/* Card Veículos Ativos */}
            <div style={{
              background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
              padding: '24px',
              borderRadius: '16px',
              color: 'white',
              boxShadow: '0 8px 25px rgba(5, 150, 105, 0.25)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', opacity: 0.9 }}>Veículos Ativos</h3>
                  <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>{veiculos.filter(v => v.status === 'ativo').length}</p>
                </div>
                <CheckCircle size={40} style={{ opacity: 0.3 }} />
              </div>
            </div>

            {/* Card Revisões Próximas */}
            <div style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
              padding: '24px',
              borderRadius: '16px',
              color: 'white',
              boxShadow: '0 8px 25px rgba(124, 58, 237, 0.25)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', opacity: 0.9 }}>Revisões Próximas</h3>
                  <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>{veiculosRevisaoProxima.length}</p>
                </div>
                <Bell size={40} style={{ opacity: 0.3 }} />
              </div>
            </div>
          </div>

          {/* Veículos em Manutenção */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '16px', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)', 
            padding: '24px',
            marginBottom: '24px'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
              <Wrench style={{ marginRight: '8px' }} size={24} />
              Veículos em Manutenção ({veiculosManutencao.length})
            </h2>
            
            {veiculosManutencao.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                <CheckCircle size={48} style={{ color: '#059669', marginBottom: '16px' }} />
                <p style={{ fontSize: '16px' }}>Nenhum veículo em manutenção no momento.</p>
                <p style={{ fontSize: '14px' }}>Todos os veículos estão em perfeitas condições!</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '16px' }}>
                {veiculosManutencao.map(veiculo => {
                  const viagensVeiculo = viagens.filter(v => v.prefixo === veiculo.prefixo);
                  const problemasVeiculo = viagensVeiculo.reduce((acc, viagem) => {
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
                      padding: '20px', 
                      backgroundColor: '#fef2f2', 
                      borderRadius: '12px',
                      border: '2px solid #fecaca'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <div>
                          <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '600', color: '#991b1b' }}>
                            Veículo {veiculo.prefixo}
                          </h3>
                          <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6b7280' }}>
                            {veiculo.placa} - {veiculo.modelo}
                          </p>
                          <span style={{ 
                            fontSize: '12px', 
                            backgroundColor: '#fee2e2', 
                            color: '#991b1b', 
                            padding: '4px 8px', 
                            borderRadius: '12px',
                            fontWeight: '500'
                          }}>
                            {problemasVeiculo.length} problema(s) pendente(s)
                          </span>
                        </div>
                        <button
                          onClick={() => liberarVeiculo(veiculo.id)}
                          style={{
                            ...buttonStyle,
                            background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                            padding: '8px 16px',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            width: 'auto'
                          }}
                        >
                          <CheckCircle size={16} />
                          Liberar Veículo
                        </button>
                      </div>
                      
                      {problemasVeiculo.length > 0 && (
                        <div>
                          <h4 style={{ fontSize: '14px', color: '#991b1b', marginBottom: '12px', fontWeight: '600' }}>
                            Problemas a serem resolvidos:
                          </h4>
                          {problemasVeiculo.map((problema, idx) => (
                            <div key={idx} style={{ 
                              marginBottom: '12px', 
                              padding: '16px', 
                              backgroundColor: '#fee2e2', 
                              borderRadius: '8px',
                              border: '1px solid #fecaca'
                            }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ flex: 1 }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <span style={{ 
                                      fontSize: '12px', 
                                      backgroundColor: '#991b1b', 
                                      color: 'white', 
                                      padding: '2px 8px', 
                                      borderRadius: '12px',
                                      fontWeight: '500'
                                    }}>
                                      {problema.tipo === 'checklist' ? 'CHECKLIST' : 'ORDEM DE SERVIÇO'}
                                    </span>
                                    <span style={{ fontSize: '12px', color: '#6b7280' }}>
                                      {problema.data}
                                    </span>
                                  </div>
                                  <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#991b1b', fontWeight: '500' }}>
                                    {problema.descricao}
                                  </p>
                                  <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>
                                    Motorista: {problema.motorista}
                                  </p>
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
                                    ...buttonStyle,
                                    background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                                    padding: '6px 12px',
                                    fontSize: '12px',
                                    marginLeft: '12px',
                                    width: 'auto'
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
            borderRadius: '16px', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)', 
            padding: '24px'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
              <FileText style={{ marginRight: '8px' }} size={24} />
              Ordens de Serviço Pendentes ({viagensComOS.length})
            </h2>
            
            {viagensComOS.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                <CheckCircle size={48} style={{ color: '#059669', marginBottom: '16px' }} />
                <p style={{ fontSize: '16px' }}>Nenhuma ordem de serviço pendente.</p>
                <p style={{ fontSize: '14px' }}>Todos os serviços foram processados!</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '16px' }}>
                {viagensComOS.map(viagem => (
                  <div key={viagem.id} style={{ 
                    padding: '20px', 
                    backgroundColor: '#fffbeb', 
                    borderRadius: '12px',
                    border: '2px solid #fed7aa'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div>
                        <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '600', color: '#92400e' }}>
                          Veículo {viagem.prefixo}
                        </h3>
                        <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6b7280' }}>
                          {viagem.dataHora} | Motorista: {viagem.motorista}
                        </p>
                        <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
                          Rota: {viagem.origem} → {viagem.destino}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => colocarEmManutencao(viagem.prefixo)}
                          style={{
                            ...buttonDangerStyle,
                            fontSize: '12px',
                            padding: '6px 12px'
                          }}
                        >
                          Colocar em Manutenção
                        </button>
                        <button
                          onClick={() => processarOS(viagem.id)}
                          style={{
                            ...buttonStyle,
                            background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                            padding: '6px 12px',
                            fontSize: '12px',
                            width: 'auto'
                          }}
                        >
                          Processar OS
                        </button>
                      </div>
                    </div>
                    
                    <div style={{ 
                      padding: '16px', 
                      backgroundColor: '#fef3c7', 
                      borderRadius: '8px',
                      borderLeft: '4px solid #f59e0b'
                    }}>
                      <h4 style={{ margin: '0 0 8px 0', color: '#92400e', fontSize: '14px', fontWeight: '600' }}>
                        Ordem de Serviço:
                      </h4>
                      <p style={{ margin: 0, color: '#92400e', fontSize: '14px' }}>
                        {viagem.ordemServico}
                      </p>
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
  if (usuario.tela === 'dashboard-gerencia') {
    const motoristasAtivos = usuarios.filter(u => u.tipo === 'motorista' && u.status === 'ativo');
    const viagensComProblemas = viagens.filter(v => v.temProblemas);
    const totalKm = viagens.reduce((total, viagem) => total + viagem.kmPercorridos, 0);
    const veiculosManutencao = veiculos.filter(v => v.status === 'manutencao');
    const problemasAtivos = viagens.reduce((total, viagem) => {
      const itensNaoResolvidos = viagem.itensNaoConformes?.filter(item => !item.resolvido)?.length || 0;
      const osNaoResolvida = (viagem.ordemServico && viagem.ordemServico.trim() && viagem.statusManutencao !== 'resolvida') ? 1 : 0;
      return total + itensNaoResolvidos + osNaoResolvida;
    }, 0);

    // Cálculos de performance
    const mediaKmPorViagem = viagens.length > 0 ? (totalKm / viagens.length).toFixed(1) : 0;
    const percentualProblemas = viagens.length > 0 ? ((viagensComProblemas.length / viagens.length) * 100).toFixed(1) : 0;
    const disponibilidadeFrota = veiculos.length > 0 ? (((veiculos.length - veiculosManutencao.length) / veiculos.length) * 100).toFixed(1) : 100;

    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f8fafc',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          padding: '24px',
          color: 'white'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 8px 0' }}>
                Painel Gerencial
              </h1>
              <p style={{ fontSize: '18px', margin: 0, opacity: 0.9 }}>
                Olá, {usuario.nome}! Acompanhe os indicadores da operação.
              </p>
            </div>
            <button
              onClick={logout}
              style={{
                ...buttonDangerStyle,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <LogOut size={18} />
              Sair
            </button>
          </div>
        </div>
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px' }}>
          {/* KPIs Principais */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            marginBottom: '32px'
          }}>
            {/* Total de Viagens */}
            <div style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              padding: '24px',
              borderRadius: '16px',
              color: 'white',
              boxShadow: '0 8px 25px rgba(59, 130, 246, 0.25)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', opacity: 0.9 }}>Total de Viagens</h3>
                  <p style={{ margin: '0 0 4px 0', fontSize: '28px', fontWeight: 'bold' }}>{viagens.length}</p>
                  <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>{totalKm.toLocaleString()} km percorridos</p>
                </div>
                <Activity size={36} style={{ opacity: 0.3 }} />
              </div>
            </div>

            {/* Motoristas Ativos */}
            <div style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              padding: '24px',
              borderRadius: '16px',
              color: 'white',
              boxShadow: '0 8px 25px rgba(16, 185, 129, 0.25)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', opacity: 0.9 }}>Motoristas Ativos</h3>
                  <p style={{ margin: '0 0 4px 0', fontSize: '28px', fontWeight: 'bold' }}>{motoristasAtivos.length}</p>
                  <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Equipe operacional</p>
                </div>
                <Users size={36} style={{ opacity: 0.3 }} />
              </div>
            </div>

            {/* Disponibilidade da Frota */}
            <div style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              padding: '24px',
              borderRadius: '16px',
              color: 'white',
              boxShadow: '0 8px 25px rgba(139, 92, 246, 0.25)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', opacity: 0.9 }}>Disponibilidade da Frota</h3>
                  <p style={{ margin: '0 0 4px 0', fontSize: '28px', fontWeight: 'bold' }}>{disponibilidadeFrota}%</p>
                  <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>{veiculos.length - veiculosManutencao.length} de {veiculos.length} ativos</p>
                </div>
                <Truck size={36} style={{ opacity: 0.3 }} />
              </div>
            </div>

            {/* Taxa de Problemas */}
            <div style={{
              background: percentualProblemas > 20 ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              padding: '24px',
              borderRadius: '16px',
              color: 'white',
              boxShadow: percentualProblemas > 20 ? '0 8px 25px rgba(239, 68, 68, 0.25)' : '0 8px 25px rgba(245, 158, 11, 0.25)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', opacity: 0.9 }}>Taxa de Problemas</h3>
                  <p style={{ margin: '0 0 4px 0', fontSize: '28px', fontWeight: 'bold' }}>{percentualProblemas}%</p>
                  <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>{viagensComProblemas.length} viagens com ocorrências</p>
                </div>
                <AlertTriangle size={36} style={{ opacity: 0.3 }} />
              </div>
            </div>

            {/* Média KM/Viagem */}
            <div style={{
              background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
              padding: '24px',
              borderRadius: '16px',
              color: 'white',
              boxShadow: '0 8px 25px rgba(6, 182, 212, 0.25)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', opacity: 0.9 }}>Média KM/Viagem</h3>
                  <p style={{ margin: '0 0 4px 0', fontSize: '28px', fontWeight: 'bold' }}>{mediaKmPorViagem}</p>
                  <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Quilômetros por viagem</p>
                </div>
                <BarChart3 size={36} style={{ opacity: 0.3 }} />
              </div>
            </div>
          </div>

          {/* Seção de Relatórios */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            marginBottom: '32px'
          }}>
            {/* Resumo Operacional */}
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '16px', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)', 
              padding: '24px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#1f2937' }}>
                📊 Resumo Operacional
              </h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                  <span style={{ color: '#6b7280' }}>Total de Veículos:</span>
                  <span style={{ fontWeight: '600' }}>{veiculos.length}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                  <span style={{ color: '#6b7280' }}>Veículos Operacionais:</span>
                  <span style={{ fontWeight: '600', color: '#059669' }}>{veiculos.length - veiculosManutencao.length}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                  <span style={{ color: '#6b7280' }}>Em Manutenção:</span>
                  <span style={{ fontWeight: '600', color: '#dc2626' }}>{veiculosManutencao.length}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                  <span style={{ color: '#6b7280' }}>Problemas Ativos:</span>
                  <span style={{ fontWeight: '600', color: '#f59e0b' }}>{problemasAtivos}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                  <span style={{ color: '#6b7280' }}>Total de Usuários:</span>
                  <span style={{ fontWeight: '600' }}>{usuarios.length}</span>
                </div>
              </div>
            </div>

            {/* Análise de Performance */}
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '16px', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)', 
              padding: '24px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#1f2937' }}>
                📈 Análise de Performance
              </h3>
              <div style={{ display: 'grid', gap: '16px' }}>
                {/* Indicador de Eficiência */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>Eficiência Operacional</span>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: disponibilidadeFrota >= 80 ? '#059669' : '#dc2626' }}>
                      {disponibilidadeFrota >= 80 ? 'Excelente' : 'Atenção Necessária'}
                    </span>
                  </div>
                  <div style={{ 
                    width: '100%', 
                    height: '8px', 
                    backgroundColor: '#e5e7eb', 
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      width: `${disponibilidadeFrota}%`, 
                      height: '100%', 
                      backgroundColor: disponibilidadeFrota >= 80 ? '#059669' : disponibilidadeFrota >= 60 ? '#f59e0b' : '#dc2626',
                      transition: 'width 0.3s ease'
                    }}></div>
                  </div>
                </div>

                {/* Indicador de Qualidade */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>Qualidade das Viagens</span>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: percentualProblemas <= 10 ? '#059669' : '#dc2626' }}>
                      {percentualProblemas <= 10 ? 'Boa' : 'Requer Melhoria'}
                    </span>
                  </div>
                  <div style={{ 
                    width: '100%', 
                    height: '8px', 
                    backgroundColor: '#e5e7eb', 
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      width: `${Math.max(0, 100 - percentualProblemas)}%`, 
                      height: '100%', 
                      backgroundColor: percentualProblemas <= 10 ? '#059669' : percentualProblemas <= 25 ? '#f59e0b' : '#dc2626',
                      transition: 'width 0.3s ease'
                    }}></div>
                  </div>
                </div>

                {/* Recomendações */}
                <div style={{ 
                  marginTop: '8px',
                  padding: '12px',
                  backgroundColor: '#f0f9ff',
                  borderRadius: '8px',
                  border: '1px solid #0ea5e9'
                }}>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600', color: '#0369a1' }}>
                    💡 Recomendações:
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px', color: '#0369a1' }}>
                    {disponibilidadeFrota < 80 && (
                      <li>Acelerar processos de manutenção para aumentar disponibilidade</li>
                    )}
                    {percentualProblemas > 15 && (
                      <li>Implementar treinamentos adicionais para motoristas</li>
                    )}
                    {viagens.length < 10 && (
                      <li>Aumentar frequência de viagens para melhorar dados</li>
                    )}
                    {problemasAtivos > 5 && (
                      <li>Priorizar resolução dos problemas ativos pendentes</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Histórico Recente de Viagens */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '16px', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)', 
            padding: '24px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#1f2937' }}>
              🚍 Histórico Recente de Viagens
            </h3>
            
            {viagens.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                <Activity size={48} style={{ color: '#d1d5db', marginBottom: '16px' }} />
                <p style={{ fontSize: '16px' }}>Nenhuma viagem registrada ainda.</p>
                <p style={{ fontSize: '14px' }}>Os dados aparecerão aqui quando as viagens forem realizadas.</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f9fafb' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Data/Hora</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Motorista</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Rota</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Veículo</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', fontSize: '14px', fontWeight: '600', color: '#374151' }}>KM</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {viagens.slice(-10).reverse().map((viagem, index) => (
                      <tr key={viagem.id} style={{ 
                        borderBottom: '1px solid #f3f4f6',
                        backgroundColor: index % 2 === 0 ? 'white' : '#fafafa'
                      }}>
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: '#374151' }}>{viagem.dataHora}</td>
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: '#374151' }}>{viagem.motorista}</td>
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: '#374151' }}>{viagem.origem} → {viagem.destino}</td>
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: '#374151' }}>{viagem.prefixo}</td>
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: '#374151' }}>{viagem.kmPercorridos} km</td>
                        <td style={{ padding: '12px 16px' }}>
                          {viagem.temProblemas ? (
                            <div style={{ display: 'flex', alignItems: 'center', color: '#dc2626' }}>
                              <AlertTriangle size={16} style={{ marginRight: '6px' }} />
                              <span style={{ fontSize: '12px', fontWeight: '500' }}>Com Ocorrências</span>
                            </div>
                          ) : (
                            <div style={{ display: 'flex', alignItems: 'center', color: '#059669' }}>
                              <CheckCircle size={16} style={{ marginRight: '6px' }} />
                              <span style={{ fontSize: '12px', fontWeight: '500' }}>Normal</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // DASHBOARD ADMIN MODERNO
  if (usuario.tela === 'dashboard-admin') {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f8fafc',
        display: 'flex',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        {/* Sidebar */}
        <div style={{
          width: sidebarAberta ? '280px' : '80px',
          backgroundColor: 'white',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
          transition: 'width 0.3s ease',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{
            padding: '24px',
            borderBottom: '1px solid #e5e7eb'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Truck style={{ width: '24px', height: '24px', color: 'white' }} />
              </div>
              {sidebarAberta && (
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Admin Panel</h3>
                  <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Controle Total</p>
                </div>
              )}
            </div>
          </div>
          
          <div style={{ padding: '16px' }}>
            <button
              onClick={() => setSidebarAberta(!sidebarAberta)}
              style={{
                width: '100%',
                padding: '12px',
                background: 'none',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#6b7280',
                fontSize: '14px'
              }}
            >
              <Menu size={20} />
              {sidebarAberta && <span>Recolher Menu</span>}
            </button>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div style={{ flex: 1, padding: '24px' }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px'
          }}>
            <div>
              <h1 style={{ 
                fontSize: '32px', 
                fontWeight: '700', 
                color: '#1f2937',
                margin: '0 0 8px 0'
              }}>
                Dashboard Administrativo
              </h1>
              <p style={{ 
                color: '#6b7280', 
                fontSize: '16px',
                margin: 0
              }}>
                Visão geral do sistema e controle de operações
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <User size={20} style={{ color: '#667eea' }} />
                <span style={{ fontWeight: '500' }}>Olá, {usuario.nome}</span>
              </div>
              <button
                onClick={logout}
                style={{
                  ...buttonDangerStyle,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <LogOut size={18} />
                Sair
              </button>
            </div>
          </div>

          {/* Cards de Estatísticas */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '32px'
          }}>
            {/* Card Usuários */}
            <div 
              onClick={() => setModalAtivo('usuarios')}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '24px',
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.25)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '80px',
                height: '80px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%'
              }}></div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ color: 'white', fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0' }}>
                    Usuários do Sistema
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '36px', fontWeight: '700', margin: 0 }}>
                    {estatisticas.totalUsuarios}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', margin: '8px 0 0 0' }}>
                    Clique para gerenciar
                  </p>
                </div>
                <Users size={48} style={{ color: 'rgba(255,255,255,0.3)' }} />
              </div>
            </div>

            {/* Card Veículos */}
            <div 
              onClick={() => setModalAtivo('veiculos')}
              style={{
                background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                padding: '24px',
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(17, 153, 142, 0.25)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '80px',
                height: '80px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%'
              }}></div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ color: 'white', fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0' }}>
                    Frota de Veículos
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '36px', fontWeight: '700', margin: 0 }}>
                    {estatisticas.totalVeiculos}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', margin: '8px 0 0 0' }}>
                    {estatisticas.veiculosManutencao} em manutenção
                  </p>
                </div>
                <Truck size={48} style={{ color: 'rgba(255,255,255,0.3)' }} />
              </div>
            </div>

            {/* Card Viagens */}
            <div 
              onClick={() => setModalAtivo('viagens')}
              style={{
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                padding: '24px',
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(240, 147, 251, 0.25)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '80px',
                height: '80px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%'
              }}></div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ color: 'white', fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0' }}>
                    Total de Viagens
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '36px', fontWeight: '700', margin: 0 }}>
                    {estatisticas.totalViagens}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', margin: '8px 0 0 0' }}>
                    {estatisticas.totalKm.toLocaleString()} km percorridos
                  </p>
                </div>
                <Activity size={48} style={{ color: 'rgba(255,255,255,0.3)' }} />
              </div>
            </div>

            {/* Card Problemas */}
            <div 
              onClick={() => setModalAtivo('ocorrencias')}
              style={{
                background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
                padding: '24px',
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(255, 107, 107, 0.25)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '80px',
                height: '80px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%'
              }}></div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ color: 'white', fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0' }}>
                    Problemas Ativos
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '36px', fontWeight: '700', margin: 0 }}>
                    {estatisticas.problemasAtivos}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', margin: '8px 0 0 0' }}>
                    Requer atenção
                  </p>
                </div>
                <AlertTriangle size={48} style={{ color: 'rgba(255,255,255,0.3)' }} />
              </div>
            </div>

            {/* Card Itens de Checklist */}
            <div 
              onClick={() => setModalAtivo('checklist')}
              style={{
                background: 'linear-gradient(135deg, #4c51bf 0%, #805ad5 100%)',
                padding: '24px',
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(76, 81, 191, 0.25)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '80px',
                height: '80px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%'
              }}></div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ color: 'white', fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0' }}>
                    Itens de Checklist
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '36px', fontWeight: '700', margin: 0 }}>
                    {estatisticas.totalItensChecklist}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', margin: '8px 0 0 0' }}>
                    Itens de verificação
                  </p>
                </div>
                <CheckCircle size={48} style={{ color: 'rgba(255,255,255,0.3)' }} />
              </div>
            </div>
          </div>

          {/* Seção de Ações Rápidas */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            marginBottom: '32px'
          }}>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: '600', 
              color: '#1f2937',
              margin: '0 0 24px 0'
            }}>
              Ações Rápidas
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              <button
                onClick={() => setModalAtivo('usuarios')}
                style={{
                  ...buttonStyle,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  justifyContent: 'center'
                }}
              >
                <Plus size={18} />
                Adicionar Usuário
              </button>
              <button
                onClick={() => setModalAtivo('veiculos')}
                style={{
                  ...buttonSecondaryStyle,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  justifyContent: 'center'
                }}
              >
                <Plus size={18} />
                Adicionar Veículo
              </button>
              <button
                onClick={() => setModalAtivo('cidades')}
                style={{
                  ...buttonSecondaryStyle,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  justifyContent: 'center'
                }}
              >
                <Plus size={18} />
                Adicionar Cidade
              </button>
              <button
                onClick={() => setModalAtivo('checklist')}
                style={{
                  ...buttonSecondaryStyle,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  justifyContent: 'center'
                }}
              >
                <Plus size={18} />
                Itens de Checklist
              </button>
              <button
                onClick={() => setModalAtivo('relatorio-km')}
                style={{
                  ...buttonSecondaryStyle,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  justifyContent: 'center'
                }}
              >
                <BarChart3 size={18} />
                Relatório de KM
              </button>
              <button
                onClick={() => setModalAtivo('viagens')}
                style={{
                  ...buttonSecondaryStyle,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  justifyContent: 'center'
                }}
              >
                <BarChart3 size={18} />
                Ver Relatórios
              </button>
            </div>
          </div>
        </div>

        {/* MODAIS */}
        {modalAtivo === 'usuarios' && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
            }}>
              <div style={{
                padding: '24px 32px',
                borderBottom: '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
              }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Gerenciar Usuários</h2>
                <button
                  onClick={() => setModalAtivo(null)}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    borderRadius: '8px',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white'
                  }}
                >
                  <X size={18} />
                </button>
              </div>
              <div style={{ padding: '32px', maxHeight: 'calc(90vh - 100px)', overflowY: 'auto' }}>
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                    Adicionar Novo Usuário
                  </h3>
                  <div style={{ display: 'grid', gap: '16px' }}>
                    <input
                      type="text"
                      placeholder="Nome completo do usuário"
                      value={nomeUsuario}
                      onChange={(e) => setNomeUsuario(e.target.value)}
                      style={inputStyle}
                    />
                    <input
                      type="password"
                      placeholder="Senha de acesso"
                      value={senhaUsuario}
                      onChange={(e) => setSenhaUsuario(e.target.value)}
                      style={inputStyle}
                    />
                    <select
                      value={tipoUsuarioNovo}
                      onChange={(e) => setTipoUsuarioNovo(e.target.value)}
                      style={inputStyle}
                    >
                      <option value="motorista">Motorista</option>
                      <option value="manutencao">Manutenção</option>
                      <option value="gerencia">Gerência</option>
                    </select>
                    <button
                      onClick={adicionarUsuario}
                      style={{
                        ...buttonStyle,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        justifyContent: 'center'
                      }}
                    >
                      <Plus size={18} />
                      Adicionar Usuário
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                    Usuários Cadastrados ({usuarios.length})
                  </h3>
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {usuarios.map(usuario => (
                      <div key={usuario.id} style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        padding: '16px', 
                        backgroundColor: '#f8fafc', 
                        borderRadius: '12px',
                        marginBottom: '8px',
                        border: '1px solid #e5e7eb'
                      }}>
                        <div>
                          <div style={{ fontWeight: '600', color: '#1f2937' }}>{usuario.nome}</div>
                          <div style={{ fontSize: '14px', color: '#6b7280' }}>
                            {usuario.tipo.charAt(0).toUpperCase() + usuario.tipo.slice(1)}
                          </div>
                        </div>
                        <button
                          onClick={() => removerUsuario(usuario.id)}
                          style={buttonDangerStyle}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {modalAtivo === 'veiculos' && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
            }}>
              <div style={{
                padding: '24px 32px',
                borderBottom: '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
              }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Gerenciar Veículos</h2>
                <button
                  onClick={() => setModalAtivo(null)}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    borderRadius: '8px',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white'
                  }}
                >
                  <X size={18} />
                </button>
              </div>
              <div style={{ padding: '32px', maxHeight: 'calc(90vh - 100px)', overflowY: 'auto' }}>
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                    Adicionar Novo Veículo
                  </h3>
                  <div style={{ display: 'grid', gap: '16px' }}>
                    <input
                      type="text"
                      placeholder="Prefixo do veículo (ex: 1001)"
                      value={prefixoVeiculo}
                      onChange={(e) => setPrefixoVeiculo(e.target.value)}
                      style={inputStyle}
                    />
                    <input
                      type="text"
                      placeholder="Placa do veículo (ex: ABC-1234)"
                      value={placaVeiculo}
                      onChange={(e) => setPlacaVeiculo(e.target.value)}
                      style={inputStyle}
                    />
                    <input
                      type="text"
                      placeholder="Modelo do veículo"
                      value={modeloVeiculo}
                      onChange={(e) => setModeloVeiculo(e.target.value)}
                      style={inputStyle}
                    />
                    <input
                      type="number"
                      placeholder="KM atual do veículo"
                      value={kmAtualVeiculo}
                      onChange={(e) => setKmAtualVeiculo(e.target.value)}
                      style={inputStyle}
                    />
                    <input
                      type="number"
                      placeholder="Intervalo de revisão (km)"
                      value={intervaloRevisaoVeiculo}
                      onChange={(e) => setIntervaloRevisaoVeiculo(e.target.value)}
                      style={inputStyle}
                    />
                    <button
                      onClick={adicionarVeiculo}
                      style={{
                        ...buttonStyle,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        justifyContent: 'center'
                      }}
                    >
                      <Plus size={18} />
                      Adicionar Veículo
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                    Veículos Cadastrados ({veiculos.length})
                  </h3>
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {veiculos.map(veiculo => {
                      const kmParaRevisao = veiculo.kmProximaRevisao - veiculo.ultimoKm;
                      const precisaRevisao = kmParaRevisao <= 1000;
                      const estaEditando = veiculoEditando === veiculo.id;
                      
                      return (
                        <div key={veiculo.id} style={{ 
                          display: 'flex', 
                          flexDirection: 'column',
                          padding: '16px', 
                          backgroundColor: precisaRevisao ? '#fef2f2' : veiculo.status === 'manutencao' ? '#fef2f2' : '#f8fafc', 
                          borderRadius: '12px',
                          marginBottom: '8px',
                          border: `2px solid ${precisaRevisao ? '#fca5a5' : veiculo.status === 'manutencao' ? '#fecaca' : '#e5e7eb'}`
                        }}>
                          {/* Cabeçalho do veículo */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                                {veiculo.prefixo} - {veiculo.placa}
                              </div>
                              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
                                {veiculo.modelo}
                              </div>
                              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <div style={{ 
                                  fontSize: '12px', 
                                  color: veiculo.status === 'manutencao' ? '#dc2626' : '#059669',
                                  fontWeight: '500',
                                  padding: '2px 8px',
                                  backgroundColor: veiculo.status === 'manutencao' ? '#fee2e2' : '#dcfce7',
                                  borderRadius: '12px'
                                }}>
                                  {veiculo.status === 'manutencao' ? '🔧 Em Manutenção' : '✅ Ativo'}
                                </div>
                                {precisaRevisao && (
                                  <div style={{ 
                                    fontSize: '12px', 
                                    color: '#dc2626',
                                    fontWeight: '500',
                                    padding: '2px 8px',
                                    backgroundColor: '#fee2e2',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                  }}>
                                    <AlertTriangle size={12} />
                                    Revisão {kmParaRevisao >= 0 ? `em ${kmParaRevisao} km` : 'Vencida'}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              {!estaEditando ? (
                                <>
                                  <button
                                    onClick={() => iniciarEdicaoVeiculo(veiculo)}
                                    style={{
                                      ...buttonSecondaryStyle,
                                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                      color: 'white',
                                      width: 'auto',
                                      padding: '6px 10px',
                                      fontSize: '12px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '4px'
                                    }}
                                  >
                                    <Edit2 size={14} />
                                    Editar KM
                                  </button>
                                  <button
                                    onClick={() => removerVeiculo(veiculo.id)}
                                    style={buttonDangerStyle}
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => salvarEdicaoVeiculo(veiculo.id)}
                                    style={{
                                      ...buttonStyle,
                                      background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                                      width: 'auto',
                                      padding: '6px 10px',
                                      fontSize: '12px'
                                    }}
                                  >
                                    ✅ Salvar
                                  </button>
                                  <button
                                    onClick={cancelarEdicaoVeiculo}
                                    style={{
                                      ...buttonDangerStyle,
                                      fontSize: '12px',
                                      padding: '6px 10px'
                                    }}
                                  >
                                    ✖️ Cancelar
                                  </button>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Informações de KM */}
                          {!estaEditando ? (
                            <div style={{ fontSize: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: '8px' }}>
                              <div>
                                <span style={{ color: '#6b7280' }}>KM Atual: </span>
                                <span style={{ fontWeight: '500' }}>{veiculo.ultimoKm?.toLocaleString() || 'N/A'}</span>
                              </div>
                              <div>
                                <span style={{ color: '#6b7280' }}>Próxima Revisão: </span>
                                <span style={{ fontWeight: '500' }}>{veiculo.kmProximaRevisao?.toLocaleString() || 'N/A'}</span>
                              </div>
                              <div>
                                <span style={{ color: '#6b7280' }}>Intervalo: </span>
                                <span style={{ fontWeight: '500' }}>{veiculo.intervaloRevisao?.toLocaleString() || 'N/A'} km</span>
                              </div>
                            </div>
                          ) : (
                            <div style={{ marginTop: '12px', padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#1e40af' }}>
                                ⚙️ Editar Parâmetros de KM
                              </h4>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                                <div>
                                  <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                                    KM Atual
                                  </label>
                                  <input
                                    type="number"
                                    value={editKmAtual}
                                    onChange={(e) => {
                                      setEditKmAtual(e.target.value);
                                      // Auto-calcular próxima revisão
                                      const novoKm = parseInt(e.target.value) || 0;
                                      const intervalo = parseInt(editIntervaloRevisao) || 10000;
                                      setEditKmProximaRevisao((novoKm + intervalo).toString());
                                    }}
                                    style={{
                                      width: '100%',
                                      padding: '6px 8px',
                                      border: '1px solid #d1d5db',
                                      borderRadius: '6px',
                                      fontSize: '14px',
                                      boxSizing: 'border-box'
                                    }}
                                  />
                                </div>
                                <div>
                                  <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                                    Intervalo Revisão (km)
                                  </label>
                                  <input
                                    type="number"
                                    value={editIntervaloRevisao}
                                    onChange={(e) => {
                                      setEditIntervaloRevisao(e.target.value);
                                      // Auto-calcular próxima revisão
                                      const kmAtual = parseInt(editKmAtual) || 0;
                                      const novoIntervalo = parseInt(e.target.value) || 10000;
                                      setEditKmProximaRevisao((kmAtual + novoIntervalo).toString());
                                    }}
                                    style={{
                                      width: '100%',
                                      padding: '6px 8px',
                                      border: '1px solid #d1d5db',
                                      borderRadius: '6px',
                                      fontSize: '14px',
                                      boxSizing: 'border-box'
                                    }}
                                  />
                                </div>
                                <div>
                                  <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                                    Próxima Revisão (km)
                                  </label>
                                  <input
                                    type="number"
                                    value={editKmProximaRevisao}
                                    onChange={(e) => setEditKmProximaRevisao(e.target.value)}
                                    style={{
                                      width: '100%',
                                      padding: '6px 8px',
                                      border: '1px solid #d1d5db',
                                      borderRadius: '6px',
                                      fontSize: '14px',
                                      boxSizing: 'border-box'
                                    }}
                                  />
                                </div>
                              </div>
                              <div style={{ marginTop: '8px', fontSize: '11px', color: '#6b7280' }}>
                                💡 <strong>Dica:</strong> Os campos são calculados automaticamente conforme você digita. Você pode ajustar manualmente a próxima revisão se necessário.
                                <br />
                                <strong>Exemplo:</strong> KM Atual: 50.000 + Intervalo: 10.000 = Próxima Revisão: 60.000 km
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {modalAtivo === 'cidades' && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
            }}>
              <div style={{
                padding: '24px 32px',
                borderBottom: '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
              }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Gerenciar Cidades</h2>
                <button
                  onClick={() => setModalAtivo(null)}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    borderRadius: '8px',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white'
                  }}
                >
                  <X size={18} />
                </button>
              </div>
              <div style={{ padding: '32px', maxHeight: 'calc(90vh - 100px)', overflowY: 'auto' }}>
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                    Adicionar Nova Cidade
                  </h3>
                  <div style={{ display: 'grid', gap: '16px' }}>
                    <input
                      type="text"
                      placeholder="Nome da cidade"
                      value={nomeCidade}
                      onChange={(e) => setNomeCidade(e.target.value)}
                      style={inputStyle}
                    />
                    <input
                      type="text"
                      placeholder="UF (ex: SP)"
                      value={ufCidade}
                      onChange={(e) => setUfCidade(e.target.value.toUpperCase())}
                      maxLength="2"
                      style={inputStyle}
                    />
                    <button
                      onClick={adicionarCidade}
                      style={{
                        ...buttonStyle,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        justifyContent: 'center'
                      }}
                    >
                      <Plus size={18} />
                      Adicionar Cidade
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                    Cidades Cadastradas ({cidades.length})
                  </h3>
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {cidades.map(cidade => (
                      <div key={cidade.id} style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        padding: '16px', 
                        backgroundColor: '#f8fafc', 
                        borderRadius: '12px',
                        marginBottom: '8px',
                        border: '1px solid #e5e7eb'
                      }}>
                        <div>
                          <div style={{ fontWeight: '600', color: '#1f2937' }}>
                            {cidade.nome} - {cidade.uf}
                          </div>
                        </div>
                        <MapPin size={20} style={{ color: '#6b7280' }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {modalAtivo === 'checklist' && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
            }}>
              <div style={{
                padding: '24px 32px',
                borderBottom: '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #4c51bf 0%, #805ad5 100%)',
                color: 'white'
              }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Gerenciar Itens de Checklist</h2>
                <button
                  onClick={() => setModalAtivo(null)}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    borderRadius: '8px',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white'
                  }}
                >
                  <X size={18} />
                </button>
              </div>
              <div style={{ padding: '32px', maxHeight: 'calc(90vh - 100px)', overflowY: 'auto' }}>
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                    Adicionar Novo Item de Checklist
                  </h3>
                  <div style={{ display: 'grid', gap: '16px' }}>
                    <input
                      type="text"
                      placeholder="Nome do item (ex: Pneus, Freios, etc.)"
                      value={nomeItemChecklist}
                      onChange={(e) => setNomeItemChecklist(e.target.value)}
                      style={inputStyle}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                      <input
                        type="checkbox"
                        id="obrigatorioCheck"
                        checked={obrigatorioItemChecklist}
                        onChange={(e) => setObrigatorioItemChecklist(e.target.checked)}
                        style={{ width: '20px', height: '20px' }}
                      />
                      <label htmlFor="obrigatorioCheck" style={{ fontSize: '16px', color: '#1f2937', cursor: 'pointer' }}>
                        Item obrigatório na verificação
                      </label>
                    </div>
                    <button
                      onClick={adicionarItemChecklist}
                      style={{
                        ...buttonStyle,
                        background: 'linear-gradient(135deg, #4c51bf 0%, #805ad5 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        justifyContent: 'center'
                      }}
                    >
                      <Plus size={18} />
                      Adicionar Item
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                    Itens de Checklist Cadastrados ({itensChecklist.length})
                  </h3>
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {itensChecklist.map(item => (
                      <div key={item.id} style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        padding: '16px', 
                        backgroundColor: '#f8fafc', 
                        borderRadius: '12px',
                        marginBottom: '8px',
                        border: '1px solid #e5e7eb'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div>
                            <div style={{ fontWeight: '600', color: '#1f2937' }}>
                              {item.nome}
                            </div>
                            <div style={{ 
                              fontSize: '12px', 
                              color: item.obrigatorio ? '#dc2626' : '#059669',
                              fontWeight: '500',
                              marginTop: '4px'
                            }}>
                              {item.obrigatorio ? '🔴 Obrigatório' : '🟢 Opcional'}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removerItemChecklist(item.id)}
                          style={buttonDangerStyle}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {modalAtivo === 'relatorio-km' && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
            }}>
              <div style={{
                padding: '24px 32px',
                borderBottom: '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
              }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Relatório de Quilometragem</h2>
                <button
                  onClick={() => setModalAtivo(null)}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    borderRadius: '8px',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white'
                  }}
                >
                  <X size={18} />
                </button>
              </div>
              <div style={{ padding: '32px', maxHeight: 'calc(90vh - 100px)', overflowY: 'auto' }}>
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                    📊 Controle de Quilometragem da Frota
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ padding: '16px', backgroundColor: '#f0f9ff', borderRadius: '12px', border: '1px solid #0ea5e9' }}>
                      <h4 style={{ margin: '0 0 8px 0', color: '#0369a1', fontSize: '14px' }}>Total KM Frota</h4>
                      <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#0369a1' }}>
                        {veiculos.reduce((total, v) => total + (v.ultimoKm || 0), 0).toLocaleString()}
                      </p>
                    </div>
                    <div style={{ padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '12px', border: '1px solid #22c55e' }}>
                      <h4 style={{ margin: '0 0 8px 0', color: '#15803d', fontSize: '14px' }}>Média por Veículo</h4>
                      <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#15803d' }}>
                        {veiculos.length > 0 ? Math.round(veiculos.reduce((total, v) => total + (v.ultimoKm || 0), 0) / veiculos.length).toLocaleString() : 0}
                      </p>
                    </div>
                    <div style={{ padding: '16px', backgroundColor: '#fef2f2', borderRadius: '12px', border: '1px solid #ef4444' }}>
                      <h4 style={{ margin: '0 0 8px 0', color: '#dc2626', fontSize: '14px' }}>Revisões Próximas</h4>
                      <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#dc2626' }}>
                        {veiculos.filter(v => (v.kmProximaRevisao - v.ultimoKm) <= 1000).length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                    Detalhamento por Veículo
                  </h3>
                  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {veiculos.map(veiculo => {
                      const kmParaRevisao = veiculo.kmProximaRevisao - veiculo.ultimoKm;
                      const precisaRevisao = kmParaRevisao <= 1000;
                      const percentualRevisao = ((veiculo.ultimoKm - (veiculo.kmProximaRevisao - veiculo.intervaloRevisao)) / veiculo.intervaloRevisao) * 100;
                      
                      return (
                        <div key={veiculo.id} style={{ 
                          padding: '20px', 
                          backgroundColor: precisaRevisao ? '#fef2f2' : '#f8fafc', 
                          borderRadius: '12px',
                          marginBottom: '12px',
                          border: `2px solid ${precisaRevisao ? '#fca5a5' : '#e5e7eb'}`
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                            <div>
                              <h4 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '600' }}>
                                {veiculo.prefixo} - {veiculo.placa}
                              </h4>
                              <p style={{ margin: '0 0 8px 0', color: '#6b7280', fontSize: '14px' }}>
                                {veiculo.modelo}
                              </p>
                              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <span style={{ 
                                  fontSize: '12px', 
                                  padding: '2px 8px',
                                  borderRadius: '12px',
                                  backgroundColor: veiculo.status === 'ativo' ? '#dcfce7' : '#fee2e2',
                                  color: veiculo.status === 'ativo' ? '#166534' : '#991b1b',
                                  fontWeight: '500'
                                }}>
                                  {veiculo.status === 'ativo' ? '✅ Ativo' : '🔧 Manutenção'}
                                </span>
                                {precisaRevisao && (
                                  <span style={{ 
                                    fontSize: '12px', 
                                    padding: '2px 8px',
                                    borderRadius: '12px',
                                    backgroundColor: '#fee2e2',
                                    color: '#991b1b',
                                    fontWeight: '500',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                  }}>
                                    <AlertTriangle size={12} />
                                    Revisão {kmParaRevisao <= 0 ? 'Vencida' : 'Próxima'}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>
                                {veiculo.ultimoKm?.toLocaleString() || 'N/A'} km
                              </div>
                              <div style={{ fontSize: '12px', color: '#6b7280' }}>Quilometragem atual</div>
                            </div>
                          </div>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '12px' }}>
                            <div>
                              <div style={{ fontSize: '12px', color: '#6b7280' }}>Próxima Revisão</div>
                              <div style={{ fontSize: '16px', fontWeight: '600' }}>
                                {veiculo.kmProximaRevisao?.toLocaleString() || 'N/A'} km
                              </div>
                            </div>
                            <div>
                              <div style={{ fontSize: '12px', color: '#6b7280' }}>Faltam</div>
                              <div style={{ fontSize: '16px', fontWeight: '600', color: kmParaRevisao <= 0 ? '#dc2626' : '#059669' }}>
                                {kmParaRevisao <= 0 ? 'Vencida' : `${kmParaRevisao.toLocaleString()} km`}
                              </div>
                            </div>
                            <div>
                              <div style={{ fontSize: '12px', color: '#6b7280' }}>Intervalo</div>
                              <div style={{ fontSize: '16px', fontWeight: '600' }}>
                                {veiculo.intervaloRevisao?.toLocaleString() || 'N/A'} km
                              </div>
                            </div>
                          </div>
                          
                          {/* Barra de progresso para revisão */}
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                              <span style={{ fontSize: '12px', color: '#6b7280' }}>Progresso até próxima revisão</span>
                              <span style={{ fontSize: '12px', fontWeight: '600', color: percentualRevisao >= 100 ? '#dc2626' : '#374151' }}>
                                {Math.min(100, Math.max(0, percentualRevisao)).toFixed(1)}%
                              </span>
                            </div>
                            <div style={{ 
                              width: '100%', 
                              height: '8px', 
                              backgroundColor: '#e5e7eb', 
                              borderRadius: '4px',
                              overflow: 'hidden'
                            }}>
                              <div style={{ 
                                width: `${Math.min(100, Math.max(0, percentualRevisao))}%`, 
                                height: '100%', 
                                backgroundColor: percentualRevisao >= 90 ? '#dc2626' : percentualRevisao >= 75 ? '#f59e0b' : '#059669',
                                transition: 'width 0.3s ease'
                              }}></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {modalAtivo === 'viagens' && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
            }}>
              <div style={{
                padding: '24px 32px',
                borderBottom: '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
              }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Relatório de Viagens</h2>
                <button
                  onClick={() => setModalAtivo(null)}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    borderRadius: '8px',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white'
                  }}
                >
                  <X size={18} />
                </button>
              </div>
              <div style={{ padding: '32px', maxHeight: 'calc(90vh - 100px)', overflowY: 'auto' }}>
                <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                  {viagens.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                      <Activity size={48} style={{ color: '#d1d5db', marginBottom: '16px' }} />
                      <p style={{ color: '#6b7280', fontSize: '16px' }}>Nenhuma viagem realizada ainda.</p>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gap: '16px' }}>
                      {viagens.map(viagem => (
                        <div key={viagem.id} style={{ 
                          padding: '24px', 
                          backgroundColor: viagem.temProblemas ? '#fef2f2' : '#f8fafc', 
                          borderRadius: '16px',
                          border: `2px solid ${viagem.temProblemas ? '#fecaca' : '#e5e7eb'}`
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <div>
                              <h4 style={{ margin: 0, fontWeight: '600', fontSize: '18px' }}>
                                {viagem.motorista}
                              </h4>
                              <p style={{ margin: '4px 0', color: '#6b7280', fontSize: '14px' }}>
                                {viagem.dataHora}
                              </p>
                            </div>
                            <div style={{
                              padding: '8px 16px',
                              borderRadius: '20px',
                              fontSize: '12px',
                              fontWeight: '600',
                              backgroundColor: viagem.temProblemas ? '#dc2626' : '#059669',
                              color: 'white'
                            }}>
                              {viagem.temProblemas ? '⚠️ Com Problemas' : '✅ Concluída'}
                            </div>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                            <div>
                              <span style={{ fontSize: '12px', color: '#6b7280' }}>Rota</span>
                              <p style={{ margin: '4px 0', fontWeight: '500' }}>
                                {viagem.origem} → {viagem.destino}
                              </p>
                            </div>
                            <div>
                              <span style={{ fontSize: '12px', color: '#6b7280' }}>Veículo</span>
                              <p style={{ margin: '4px 0', fontWeight: '500' }}>
                                {viagem.prefixo}
                              </p>
                            </div>
                            <div>
                              <span style={{ fontSize: '12px', color: '#6b7280' }}>Distância</span>
                              <p style={{ margin: '4px 0', fontWeight: '500' }}>
                                {viagem.kmPercorridos} km
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {modalAtivo === 'ocorrencias' && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
            }}>
              <div style={{
                padding: '24px 32px',
                borderBottom: '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
              }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Problemas Ativos</h2>
                <button
                  onClick={() => setModalAtivo(null)}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    borderRadius: '8px',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white'
                  }}
                >
                  <X size={18} />
                </button>
              </div>
              <div style={{ padding: '32px', maxHeight: 'calc(90vh - 100px)', overflowY: 'auto' }}>
                <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                  {(() => {
                    const problemasAtivos = [];
                    viagens.forEach(viagem => {
                      const itensNaoResolvidos = viagem.itensNaoConformes?.filter(item => !item.resolvido) || [];
                      itensNaoResolvidos.forEach(item => {
                        problemasAtivos.push({
                          tipo: 'checklist',
                          viagem,
                          descricao: `${item.item}: ${item.observacao}`,
                          status: 'Pendente'
                        });
                      });
                      
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
                        <div style={{ textAlign: 'center', padding: '40px' }}>
                          <CheckCircle size={48} style={{ color: '#059669', marginBottom: '16px' }} />
                          <h3 style={{ color: '#059669', fontSize: '18px', fontWeight: '600' }}>
                            Nenhum problema ativo!
                          </h3>
                          <p style={{ color: '#6b7280', fontSize: '14px' }}>
                            Todos os veículos estão em perfeitas condições.
                          </p>
                        </div>
                      );
                    }

                    return (
                      <div style={{ display: 'grid', gap: '16px' }}>
                        {problemasAtivos.map((problema, idx) => (
                          <div key={idx} style={{ 
                            padding: '24px', 
                            backgroundColor: '#fef2f2', 
                            borderRadius: '16px',
                            border: '2px solid #fecaca'
                          }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ 
                                  backgroundColor: '#dc2626', 
                                  color: 'white', 
                                  padding: '4px 12px', 
                                  borderRadius: '12px', 
                                  fontSize: '12px',
                                  fontWeight: '600'
                                }}>
                                  {problema.tipo === 'checklist' ? 'CHECKLIST' : 'ORDEM DE SERVIÇO'}
                                </div>
                                <h4 style={{ margin: 0, color: '#991b1b', fontWeight: '600' }}>
                                  Veículo: {problema.viagem.prefixo}
                                </h4>
                              </div>
                              <span style={{ fontSize: '12px', color: '#6b7280' }}>
                                {problema.viagem.dataHora}
                              </span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                              <div>
                                <span style={{ fontSize: '12px', color: '#6b7280' }}>Motorista</span>
                                <p style={{ margin: '4px 0', fontWeight: '500' }}>
                                  {problema.viagem.motorista}
                                </p>
                              </div>
                              <div>
                                <span style={{ fontSize: '12px', color: '#6b7280' }}>Rota</span>
                                <p style={{ margin: '4px 0', fontWeight: '500' }}>
                                  {problema.viagem.origem} → {problema.viagem.destino}
                                </p>
                              </div>
                            </div>
                            <div style={{ 
                              padding: '16px', 
                              backgroundColor: '#fee2e2', 
                              borderRadius: '12px',
                              borderLeft: '4px solid #dc2626'
                            }}>
                              <strong style={{ color: '#991b1b', fontSize: '14px' }}>Problema:</strong>
                              <p style={{ margin: '8px 0 0 0', color: '#991b1b', fontSize: '14px' }}>
                                {problema.descricao}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default App;
