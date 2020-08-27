import 'regenerator-runtime';

import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import './style.css';

import './script/components/route-container.js';
import './script/components/pre-loader.js';
import './script/components/competition-tabs.js';

import './script/components/page/page-klasmen.js';
import './script/components/page/page-match.js';
import './script/components/page/page-jadwal.js';
import './script/components/page/page-favorit.js';
import './script/components/page/page-team.js';

import './script/components/app-bar.js';
import './script/components/bottom-nav.js'

import main from './script/view/main.js';

document.addEventListener('DOMContentLoaded', main);