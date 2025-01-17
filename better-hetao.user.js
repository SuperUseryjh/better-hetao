// ==UserScript==
// @name         Better Hetao
// @namespace    https://github.com/mywwzh/Better-Hetao
// @version      1.0.1
// @description  更好的核桃 OJ
// @author       mywwzh
// @icon         data:image/png;base64,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
// @match        https://htoj.hetao101.com/cpp/oj/problem/detail?pid=*
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    function checkVersion(v1, v2) {
        const parts1 = v1.split('.');
        const parts2 = v2.split('.');
        for (let i = 0; i < 3; i++) {
            const num1 = parseInt(parts1[i] || 0);
            const num2 = parseInt(parts2[i] || 0);
            if (num1 > num2) return 1;
            if (num1 < num2) return -1;
        }
        return 0;
    }


    function checkUpdate() {
        const currentVersion = '1.0.1';
        const lastCheck = GM_getValue('lastUpdateCheck', 0);
        const now = Date.now();

        if (now - lastCheck > 24 * 60 * 60 * 1000) {
            GM_xmlhttpRequest({
                method: 'GET',
                url: 'https://api.mywwzh.top/better-hetao/checkUpdate.php',
                onload: function(response) {
                    if (response.status === 200) {
                        console.log('[Better Hetao] Update check response:', response.responseText);
                        const data = JSON.parse(response.responseText);
                        if (checkVersion(data.latestVersion, currentVersion) > 0) {
                            if (data.isForce === "True") {
                                if (confirm(`发现新版本 ${data.latestVersion}\n\n更新内容：\n${data.description}\n\n点击确定前往更新页面`)) {
                                    window.open(data.url, '_blank');
                                }
                            } else {
                                GM_notification({
                                    title: 'Better Hetao 更新可用',
                                    text: `新版本 ${data.latestVersion} 已发布\n${data.description}`,
                                    onclick: function() {
                                        window.open(data.url, '_blank');
                                    }
                                });
                            }
                        }
                    }
                    GM_setValue('lastUpdateCheck', now);
                }
            });
        }
    }
    checkUpdate();

    console.log('[Better Hetao] Script initialization started.');
    const style = document.createElement('style');
    style.textContent = `
        .cph-button {
            display: inline-flex;
            align-items: center;
            height: 32px;
            padding: 0 15px;
            font-size: 14px;
            border-radius: 4px;
            background: #1890ff;
            color: white;
            border: none;
            cursor: pointer;
            margin-left: 12px;
        }
        .cph-button:hover {
            background: #40a9ff;
        }
    `;
    document.head.appendChild(style);
    console.log('[Better Hetao] Button style added.');

    function getSamples() {
        console.log('[Better Hetao] Extracting samples from page...');
        const samples = [];
        const containers = document.querySelectorAll('.hetao-inout-container');
        containers.forEach((container, index) => {
            let input = container.querySelector(`.language-input${index + 1} .md-editor-code-block`);
            let output = container.querySelector(`.language-output${index + 1} .md-editor-code-block`);
            
            // fix: 如果找不到指定 language-input 的样例会导致查找失败
            if (!input || !output) {
                console.log(`[Better Hetao] Failed to get sample by finding language-input, trying to get any codeblocks...`);
                const items = container.querySelectorAll('.hetao-inout-item');
                if (items.length >= 2) {
                    input = items[0].querySelector('.md-editor-code-block');
                    output = items[1].querySelector('.md-editor-code-block');
                }
            }

            if (input && output) {
                samples.push({
                    input: input.textContent.trim(),
                    output: output.textContent.trim()
                });
                console.log(`[Better Hetao] Got sample ${index + 1}: `, {
                    input: input.textContent.trim(),
                    output: output.textContent.trim()
                });
            }
        });

        return samples;
    }

    function waitElement(selector, callback, cntLimit = 50) {
        let cnt = 0;
        const checkElement = () => {
            cnt++;
            const element = document.querySelector(selector);
            if (element) {
                callback(element);
                return;
            }
            if (cnt < cntLimit) {
                setTimeout(checkElement, 200);
            }
        };
        checkElement();
    }

    function createButton() {
        const button = document.createElement('button');
        button.textContent = '发送到 CPH';
        button.className = 'cph-button';
        button.onclick = sendToCPH;
        return button;
    }

    function insertButton() {
        if (!window.location.href.includes('detail?pid=')) {
            return;
        }
        waitElement('[class*="flex items-center gap-"]', (target) => {
            if (!target.querySelector('.cph-button')) {
                target.appendChild(createButton());
                console.log('[Better Hetao] Button inserted successfully.');
            }
        });
    }

    async function sendToCPH() {
        try {
            const h3 = document.querySelector('.text-\\[28px\\]');
            const pid = h3?.querySelector('span')?.textContent || '';
            const title = h3?.querySelectorAll('span')?.[1]?.textContent || '未知题目';
            const fullTitle = `${pid}-${title}`;

            const samples = getSamples();
            if (!samples.length) {
                alert('未找到样例！');
                console.error('[Better Hetao] No samples found.');
                return;
            }

            GM_xmlhttpRequest({
                method: 'POST',
                url: 'http://localhost:27121/competitive-companion',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    name: fullTitle,
                    group: 'Hetao OJ',
                    url: window.location.href,
                    tests: samples
                }),
                onload: function(response) {
                    if (response.status === 200) {
                        alert('样例已发送到 CPH！');
                        console.log('[Better Hetao] Samples sent to CPH successfully.');
                    } else {
                        console.error('[Better Hetao] Failed to send samples to CPH.');
                    }
                },
                onerror: function(error) {
                    alert('发送失败，请确保 CPH 正在运行！');
                    console.error('[Better Hetao] Error sending samples to CPH:', error);
                }
            });

        } catch (error) {
            alert('发送失败，请确保 CPH 正在运行！');
            console.error('[Better Hetao] Error sending samples to CPH:', error);
        }
    }


    insertButton();

    let lastUrl = location.href;
    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            insertButton();
        }
    }).observe(document, {subtree: true, childList: true});
})();