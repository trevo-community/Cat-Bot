const fs = require('fs')
const P = require('pino')
const { Boom } = require('@hapi/boom')
const fetch = require('node-fetch')
const chalk = require('chalk')
const NodeCache = require('node-cache');
const moment = require('moment-timezone')
const hora = moment.tz('America/Sao_Paulo').format('HH:mm:ss')
const data = moment.tz('America/Sao_Paulo').format('DD/MM/YY')
const yts = require('yt-search');
const readline = require("readline");
const speed = require('performance-now')
const ffmpeg = require('fluent-ffmpeg')
const clc = require("cli-color");
const { exec, spawn, execSync } = require("child_process")
const axios = require("axios")
const { color, bgcolor, logs } = require('./lib/color');
const bemvindotexto = JSON.parse(fs.readFileSync('./lib/TextoDoBemvindo.json'));
// CONFIGURAÇÃO DONO E ETC
//const clovermods = require('./main.js')
const settings = JSON.parse(fs.readFileSync('./confing.json'));
const nomeBot = settings.nomeBot
const NomeDoBot = nomeBot

const { default: makeWASocket, downloadContentFromMessage, useMultiFileAuthState, makeInMemoryStore, DisconnectReason, WAGroupMetadata, relayWAMessage, MediaPathMap, mentionedJid, processTime, MediaType, Browser, MessageType, Presence, Mimetype, Browsers, delay, fetchLatestBaileysVersion, MessageRetryMap, extractGroupMetadata, generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys');
const msgRetryCounterCache = new NodeCache();
const usePairingCode = process.argv.includes("--use-pairing-code");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// INÍCIO DS FUNÇÃO clover_mods 
async function clover_mods() {
    const store = makeInMemoryStore({
        logger: P().child({
            level: 'debug',
            stream: 'store'
        })
    })

    // NOME DO ARQUIVO DO CÓDIGO QR
    const { state, saveCreds } = await useMultiFileAuthState('./ZapZap-Registro')
    const { version } = await fetchLatestBaileysVersion();
    const question = (text) => new Promise((resolve) => rl.question(text, resolve));
    // BANER DO TERMINAL
    const cfonts = require('cfonts')
    const banner = cfonts.render(('Cat|bot'),
        {
            font: "block",
            align: "center",
            gradient: ["red", "blue"]
        })

    // CONEXÃO 

    const client = makeWASocket({
        version,
        logger: P({ level: "silent" }),
        usePairingCode,
        mobile: false,
        browser: ["FireFox (linux)"],
        auth: state,
        msgRetryCounterCache,
        defaultQueryTimeoutMs: undefined,
        patchMessageBeforeSending: (message) => {
            const requiresPatch = !!(message.buttonsMessage || message.listMessage);
            if (requiresPatch) {
                message = {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: {
                                deviceListMetadataVersion: 2,
                                deviceListMetadata: {},
                            }, ...message
                        }
                    }
                }
            }
            return message;
        }
    });

    console.log(banner.string)
    console.log('[ Clover 6.0 online ]')

    if (!client.authState.creds.registered) {
        const phoneNumber = await question(`\nDigite seu número do WhatsApp:\nEx: ${clc.bold("557598659559")}\n `);
        const code = await client.requestPairingCode(phoneNumber);
        console.log(`Seu código de conexão é: \n\n ${clc.bold(code)}\n~>`);
        console.log(`Abra seu WhatsApp, vá em ${clc.bold("Aparelhos Conectados > Conectar um novo Aparelho > Conectar usando Número.")}`)
    }

    store.bind(client.ev)

    client.ev.on("creds.update", saveCreds)
    store.bind(client.ev)
    client.ev.on("chats.set", () => {
        console.log("Tem conversas", store.chats.all())
    })
    client.ev.on("contacts.set", () => {
        console.log("Tem contatos", Object.values(store.contacts))
    })
    // CONEXÃO ATUALIZAÇÃO 
    client.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update
        if (connection === "close") {
            const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut
            console.log("Conexão fechada devido a", lastDisconnect.error, "Tentando reconectar...", shouldReconnect);
            if (shouldReconnect) {
                clover_mods()
            }

        } else if (connection === "open") {
            console.log(chalk.keyword("red")("Conectado com sucesso!"));
        }
    })

    const welkom = JSON.parse(fs.readFileSync('./lib/welkom.json'));
    const bemvindotexto = JSON.parse(fs.readFileSync('./lib/TextoDoBemvindo.json'));
    const trevo = bemvindotexto.texto
    // PARTICIPANTES DE GRUPO ATUALIZAÇÃO 
    client.ev.on('group-participants.update', async (anu) => {
        //console.log(anu)
        if (welkom.includes(anu.id)) {
            try {
                let metadata = await client.groupMetadata(anu.id)
                let participants = anu.participants
                for (let num of participants) {
                    try {
                        ppimg = await client.profilePictureUrl(anu.participants[0])
                    } catch {
                        ppimg = 'https://telegra.ph/file/41598dec8462fb039c130.jpg'
                    }
                    memb = metadata.participants.length
                    if (anu.action == 'add') {
                        num = anu.participants[0]
                        client.sendMessage(anu.id, {
                            image: { url: `${ppimg}` }, caption: `${trevo}`, headerType: 4
                        })
                    } else if (anu.action == 'remove') {
                        client.sendMessage(anu.id, { image: { url: `${ppimg}` }, caption: `OLA POVO DO GRUPO:\n*${metadata.subject}*\n\nO Membro: @${num.split('@')[0]}\n\nSaiu do Grp ou foi Banido.` })
                    }
                }
            } catch (err) {
                console.log(err)
            }
        }
    })

    // MENSAGEM ATUALIZAÇÃO 
    client.ev.on('messages.upsert', connection => {
        //console.log(connection)
        const info = connection.messages[0];
        //if (info.key.fromMe) return;
        if (connection.type != 'notify') return;
        if (info.key.remoteJid === 'status@broadcast') return;
        require('./clover.js')(client, info, settings, color)
    });

    client.ev.on('creds.update', saveCreds)
}

// start no bot...
clover_mods(), (err) => console.log("vix boy, deu erro", color(String(err), 'red'));
