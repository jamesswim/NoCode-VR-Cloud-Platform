# 無代碼 VR 雲端整合開發平台: 以空戰模擬為例 (No-Code VR Cloud Integrated Development Platform: Air Combat Simulation Example)


## 專案簡介 (Introduction)

本專案「無代碼 VR 雲端整合開發平台」旨在提供一個易於操作、無需編寫程式碼的虛擬實境 (VR) 開發環境。透過類似 Snap! (Snap7Ionic) 的積木拖曳方式，使用者可以輕鬆建構 VR 場景及互動體驗。為了展示平台能力，我們實作了一個空戰模擬範例。

This project, "No-Code VR Cloud Integrated Development Platform," aims to provide an easy-to-use, code-free development environment for Virtual Reality (VR). Utilizing a block-based interface similar to Snap! (Snap7Ionic), users can easily construct VR scenes and interactive experiences. An air combat simulation example is implemented to demonstrate the platform's capabilities.

**關鍵字 (Keywords):** Virtual Reality, VR, No-Code Development, Cloud Platform, Air Combat Simulation, A-Frame, Snap!, Snap7Ionic, 3D Simulation.

## 背景與動機 (Background and Motivation)

* 隨著元宇宙趨勢的發展，VR 應用日益受到重視，但市面上部分 VR 開發軟體存在付費門檻或功能限制。
* 本專案致力於打造一個無代碼、易於操作的 VR 開發平台，降低使用門檻。
* 鑒於近年航空情勢，專案特別加入空戰模擬範例，提供使用者參考與應用。

## 專案目標 (Project Goals)


* 建立 VR 場景 (Create VR scenes)
* 建立、設定及控制物件 (Create, configure, and control objects)
* 實現多人連線 (Implement multi-user connectivity)
* 支援 VR 設備控制 (Support VR device control)
* 整合 VR 物理系統 (Integrate VR physics system)
* 提供教學範例 (Provide tutorial examples - e.g., the air combat simulation)
* 設計 VR 使用者介面 (Design a VR user interface via the block system)

## 系統架構與技術棧 (System Architecture and Technologies Used)

* **開發平台核心 (Core Development Platform):** Snap7Ionic (Snap!) - 提供視覺化積木編程介面。
* **VR 渲染與框架 (VR Rendering and Framework):** A-Frame (基於 Three.js 和 WebGL) - 用於建立和渲染 VR 場景。
* **核心功能 (Key Features Implemented):**
    * **Snap!VR 平台區域 (Snap!VR Platform Areas):**
        * VR (A-Frame) 區：提供建立基本 VR 所需的積木。
        * VR (A-FrameComponent) 區：提供建立空戰模擬等特定功能所需的積木。
        * VR (A-FrameJS) 區：提供存放 A-Frame JavaScript 的積木。
    * **空戰模擬 (Air Combat Simulation):** 
        * 場景建立 (Scene creation)
        * 戰機生成與模型替換 (Fighter jet generation and model switching - e.g., F-35E, plane)
        * 視角切換 (Camera perspective switching - cockpit view, third-person view)
        * 武器系統 (Weapon systems - machine guns, missiles with tracking)
        * 碰撞偵測 (Collision detection)
        * 爆炸特效 (Explosion effects)
* **多人連線 (Networking - if applicable):** Networked-Aframe (使用 WebRTC 或 WebSocket)
* **物理引擎 (Physics Engine):** aframe-physics-system (基礎的碰撞檢測)

## Snap!VR 平台操作流程 (Snap!VR Platform Usage Flow)

1.  使用 HTML 區塊建立基本 HTML 框架。
2.  匯入 A-Frame 函式庫。
3.  建立 `<a-scene>` 場景。
4.  (可選) 使用 `<a-assets>` 預先載入物件。
5.  在場景中加入實體 (entity) 或預設幾何體 (box, sphere 等)。
6.  為實體附加屬性 (如位置、顏色、模型等)。
7.  (可選) 加入 A-FrameComponent 區或 A-FrameJS 區的積木以實現更複雜的功能 (如戰機、武器系統)。

## 空戰模擬範例展示 (Air Combat Simulation Showcase)
* **環境模擬 (Environment Simulation):**
![拖拉積木搭建場景](https://github.com/user-attachments/assets/f8d63faf-87b6-4b06-9a5c-fc0a7445c80b)
<p style="text-align:center;">
  <em>圖一：搭建場景流程</em>
</p>

* **戰機展示 (Fighter Jet Showcase):** F-35E, plane 模型，不同視角
* **武器系統操作 (Weapon System Operation):** 機關槍射擊、飛彈鎖定與發射、爆炸效果

## 已知問題與未來展望 (Known Issues and Future Work)

**已知問題 (Known Issues):**
* 飛彈和飛機碰撞偵測的準確性仍有改善空間。
* 使用者操作飛機的介面清晰度可以提升。
* 鎖定敵人的介面較為簡陋。
* Snap! 拖拉方塊生成的程式碼可能不是最優化的。
* A-Frame 和 JavaScript 的學習曲線相對較高。

**未來展望 (Future Work):**
* 研究與實現多種戰機種類與功能。
* 改善多人空戰模擬，提高模擬能力 (例如增加分隊計分)。
* 優化物理引擎、碰撞判定。
* 改善使用者介面與操作直觀性。
* 增加更多模型素材。
* 實現干擾彈系統。
* 增加更多種類的拖拉積木。
* 提供更完善的教學資源。

## 專題成員 (Team Members)


* 鄭泳禎
* 唐宏德
* 周立

## 指導教授 (Advisor)


* 鄭福烱 教授

## 致謝 (Acknowledgements)


* 感謝鄭福烱教授的指導與實驗室支援。
* 感謝 Eric 工程師在平台開發知識上的教導。


