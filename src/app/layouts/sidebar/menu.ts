import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
         label: 'Trabajo',
         isTitle: true
    },
    {
        id: 9,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'uil-home-alt',
        // badge: {
        //     variant: 'primary',
        //     text: '01', //'MENUITEMS.DASHBOARDS.BADGE',
        // },
        link: '/',
    },
    {
         id: 2,
         label: 'Terminal de Cobro',
         icon: 'uil-document-layout-left',
         link: '/dispositivos/lista-dispositivos',
    },
    {
        id: 3,
        label: 'Vehiculos',
        icon: 'uil-car',
        link: '/vehiculos/lista-vehiculos',
    },
    {
        id: 4,
        label: 'Conductores',
        icon: 'uil-users-alt',
        link: '/operadores/lista-operadores',
    },
    {
        id: 9,
        label: 'Genereación de Referencia de Pago',
        icon: 'uil-file-alt',
        link: '/referencia-pago/generar-referencia',
        parentId: 8,
      },
      {
        id: 10,
        label: 'Generar Boleta de Multa',
        icon: '	uil-document-info',
        link: '/boleta-multa/generar-boleta',
        parentId: 8,
      },
      {
        id: 11,
        label: 'Consulta de Estatus de Pago',
        icon: 'uil-list-ul',
        link: '/estatus-pago/consulta-estatus',
        parentId: 8,
      },
    {
        id: 5,
        label: 'Monederos',
        icon: 'uil-moneybag-alt',
        link: '/monederos/lista-monederos',
    },
    // {
    //     id: 6,
    //     label: 'Pasajeros',
    //     icon: 'uil-user-circle',
    //     link: '/pasajeros/lista-pasajeros',
    // },
    {
        id: 7,
        label: 'Transacciones',
        icon: 'uil-refresh',
        link: '/transacciones/lista-transacciones',
    },
    {
        id: 8,
        label: 'Bitacora',
        icon: 'uil-list-ul',
        link: '/bitacora/lista-bitacora',
    },
];

