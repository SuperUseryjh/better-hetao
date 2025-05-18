// ==UserScript==
// @name         Better Hetao
// @namespace    https://github.com/mywwzh/Better-Hetao
// @version      1.0.2
// @description  更好的核桃 OJ
// @author       mywwzh
// @match        https://htoj.com.cn/cpp/oj/problem/detail?pid=*
// @match        https://htoj.com.cn/python/oj/problem/detail?pid=*
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @run-at       document-start
// ==/UserScript==

(function () {
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
    } function checkUpdate() {
        const currentVersion = '1.0.2';
        const lastCheck = GM_getValue('lastUpdateCheck', 0);
        const now = Date.now();

        if (now - lastCheck > 24 * 60 * 60 * 1000) {
            GM_xmlhttpRequest({
                method: 'GET',
                url: 'https://api.mywwzh.top/better-hetao/checkUpdate.php',
                onload: function (response) {
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
                                    onclick: function () {
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
            color: white;
            border: none;
            cursor: pointer;
            margin-left: 12px;
        }
        .cph-button.blue {
            background: #1890ff;
        }
        .cph-button.green {
            background: #52c41a;
        }
        .cph-button:hover {
            opacity: 0.8;
        }
        
        .bh-settings-btn {
            position: fixed;
            top: 70px;
            right: 20px;
            background: #1890ff;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: move;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 9999;
            user-select: none;
            font-size: 20px;
        }
        
        .bh-settings-panel {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            width: 400px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 10000;
            padding: 20px;
            display: none;
        }
        
        .bh-settings-panel h3 {
            margin-top: 0;
            margin-bottom: 20px;
            font-size: 18px;
            color: #333;
        }
        
        .bh-settings-panel label {
            display: block;
            margin-bottom: 8px;
            font-size: 14px;
            color: #555;
        }
        
        .bh-settings-panel input {
            width: 100%;
            padding: 8px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
        }
        
        .bh-settings-panel .buttons {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
        }
        
        .bh-settings-panel button {
            padding: 8px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        
        .bh-settings-panel button.save {
            background: #1890ff;
            color: white;
        }
          .bh-settings-panel button.cancel {
            background: #f5f5f5;
            color: #333;
        }
        
        .bh-toast {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 10001;
            padding: 20px;
            min-width: 300px;
            max-width: 400px;
            text-align: center;
            animation: bhToastFadeIn 0.2s ease;
        }
        
        @keyframes bhToastFadeIn {
            from {
                opacity: 0;
                transform: translate(-50%, -48%);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
        }
        
        .bh-toast-content {
            margin-bottom: 20px;
            color: #333;
            white-space: pre-line;
        }
        
        .bh-toast-button {
            display: inline-block;
            padding: 8px 16px;
            background: #1890ff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        }
        
        .bh-toast-button:hover {
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

    function getProblemId() {
        const url = new URL(window.location.href);
        return url.searchParams.get('pid');
    }

    function getContestId() {
        const url = new URL(window.location.href);
        return url.searchParams.get('cid');
    }

    async function copyMarkdown() {
        const pid = getProblemId();
        const cid = getContestId();
        if (!pid) {
            showToast('无法获取题目ID！');
            return;
        }

        const zone = window.location.href.includes('/cpp/') ? 'cpp' : 'python';
        try {
            const response = await new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: `https://api.htoj.com.cn/api/code-community/api/get-problem-detail?problemId=${pid}${cid ? '&cid=' + cid : ''}`,
                    headers: {
                        'authorization': getAuthorization(),
                        'hetao-oj-zone': zone
                    },
                    onload: response => resolve(response),
                    onerror: error => reject(error)
                });
            });

            const data = JSON.parse(response.responseText);
            if (data.errCode === 0 && data.data.problemBaseVO.content) {
                const content = data.data.problemBaseVO.content;

                await navigator.clipboard.writeText(content);
                showToast('题面markdown已复制到剪贴板！');
            } else {
                console.error('[Better Hetao] Failed to get markdown content:', data);
                showToast(`获取题面失败！\n错误码: ${data.errCode}\n错误信息: ${data.errMsg || '未知错误'}`, 5000);
            }
        } catch (error) {
            console.error('[Better Hetao] Error copying markdown:', error);
            showToast(`获取题面失败！\n错误详情: ${error.message || error}`, 5000);
        }
    }

    function createButton(text, className, onClick) {
        const button = document.createElement('button');
        button.textContent = text;
        button.className = `cph-button ${className}`;
        button.onclick = onClick;
        return button;
    } function insertButtons() {
        if (!window.location.href.includes('detail?pid=')) {
            return;
        }
        waitElement('h3.text-xl', (target) => {
            if (!target.querySelector('.cph-button')) {
                const titleSpans = target.querySelectorAll('span');
                if (titleSpans.length >= 2) {
                    const buttonWrapper = document.createElement('div');
                    buttonWrapper.style.display = 'inline-flex';
                    buttonWrapper.style.alignItems = 'center';
                    buttonWrapper.style.marginLeft = '12px';
                    buttonWrapper.appendChild(createButton('发送到 CPH', 'blue', sendToCPH));
                    buttonWrapper.appendChild(createButton('复制题面', 'green', copyMarkdown));
                    target.appendChild(buttonWrapper);
                    console.log('[Better Hetao] Buttons inserted successfully.');
                } else {
                    console.error('[Better Hetao] Failed to find title spans.');
                }
            }
        });
    } async function sendToCPH() {
        try {
            const h3 = document.querySelector('h3.text-xl');
            const spans = h3.querySelectorAll('span');
            const pid = spans.length > 0 ? spans[0].textContent.trim() : '';
            const title = spans.length > 1 ? spans[1].textContent.trim() : '未知题目';
            const fullTitle = `${pid}-${title}`; const samples = getSamples();
            if (!samples.length) {
                showToast('未找到样例！');
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
                }), onload: function (response) {
                    if (response.status === 200) {
                        showToast('样例已发送到 CPH！');
                        console.log('[Better Hetao] Samples sent to CPH successfully.');
                    } else {
                        console.error('[Better Hetao] Failed to send samples to CPH.');
                    }
                },
                onerror: function (error) {
                    showToast('发送失败，请确保 CPH 正在运行！');
                    console.error('[Better Hetao] Error sending samples to CPH:', error);
                }
            });

        } catch (error) {
            showToast('发送失败，请确保 CPH 正在运行！');
            console.error('[Better Hetao] Error sending samples to CPH:', error);
        }
    }

    function createSettingsElements() {
        const settingsBtn = document.createElement('div');
        settingsBtn.className = 'bh-settings-btn';
        settingsBtn.innerHTML = '⚙️';
        settingsBtn.title = 'Better Hetao 设置';

        const settingsPanel = document.createElement('div');
        settingsPanel.className = 'bh-settings-panel';
        settingsPanel.innerHTML = `
            <h3>Better Hetao 设置</h3>
            <label for="bh-authorization">Authorization 令牌:</label>
            <input type="text" id="bh-authorization" placeholder="请输入 authorization 令牌...">
            <div class="buttons">
                <button class="cancel">取消</button>
                <button class="save">保存</button>
            </div>
        `;

        document.body.appendChild(settingsBtn);
        document.body.appendChild(settingsPanel);

        const savedAuth = GM_getValue('authorization', '');
        const authInput = document.getElementById('bh-authorization');
        if (authInput) authInput.value = savedAuth;

        let isDragging = false;
        let hasDragged = false;
        let offsetX, offsetY;
        let startX, startY;

        settingsBtn.addEventListener('mousedown', function (e) {
            isDragging = true;
            hasDragged = false;
            offsetX = e.clientX - settingsBtn.getBoundingClientRect().left;
            offsetY = e.clientY - settingsBtn.getBoundingClientRect().top;
            startX = e.clientX;
            startY = e.clientY;
            e.preventDefault();
        });

        document.addEventListener('mousemove', function (e) {
            if (!isDragging) return;
            if (Math.abs(e.clientX - startX) > 5 || Math.abs(e.clientY - startY) > 5) {
                hasDragged = true;
            }

            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            const maxX = window.innerWidth - settingsBtn.offsetWidth;
            const maxY = window.innerHeight - settingsBtn.offsetHeight;

            settingsBtn.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
            settingsBtn.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
            settingsBtn.style.right = 'auto';
        });

        document.addEventListener('mouseup', function () {
            isDragging = false;
        });

        settingsBtn.addEventListener('click', function (e) {
            if (!hasDragged) {
                settingsPanel.style.display = 'block';
            }
            hasDragged = false;
        });

        const saveButton = settingsPanel.querySelector('button.save'); saveButton.addEventListener('click', function () {
            const authorization = document.getElementById('bh-authorization').value;
            GM_setValue('authorization', authorization);
            settingsPanel.style.display = 'none';
            showToast('设置已保存');
        });

        const cancelButton = settingsPanel.querySelector('button.cancel');
        cancelButton.addEventListener('click', function () {
            document.getElementById('bh-authorization').value = GM_getValue('authorization', '');
            settingsPanel.style.display = 'none';
        });

        document.addEventListener('mousedown', function (e) {
            if (!settingsPanel.contains(e.target) && e.target !== settingsBtn) {
                settingsPanel.style.display = 'none';
            }
        });

        console.log('[Better Hetao] Settings button and panel added.');
    }

    function getAuthorization() {
        const savedAuth = GM_getValue('authorization', '');
        if (savedAuth) {
            return savedAuth;
        }

        return document.cookie.split('; ').find(row => row.startsWith('authorization='))?.split('=')[1] || '';
    }

    function showToast(message, duration = 3000) {
        const existingToast = document.querySelector('.bh-toast');
        if (existingToast) {
            existingToast.remove();
        }
        const toast = document.createElement('div');
        toast.className = 'bh-toast';

        const content = document.createElement('div');
        content.className = 'bh-toast-content';
        content.textContent = message;

        const button = document.createElement('button');
        button.className = 'bh-toast-button';
        button.textContent = '确定';
        button.onclick = function () {
            toast.remove();
        };

        toast.appendChild(content);
        toast.appendChild(button);
        document.body.appendChild(toast);

        document.addEventListener('mousedown', function closeToast(e) {
            if (!toast.contains(e.target)) {
                toast.remove();
                document.removeEventListener('mousedown', closeToast);
            }
        });

        if (duration > 0) {
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    toast.remove();
                }
            }, duration);
        }
    }

    insertButtons();

    let lastUrl = location.href;
    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            insertButtons();
        }
    }).observe(document, { subtree: true, childList: true });

    window.addEventListener('load', function () {
        createSettingsElements();
    });
})();