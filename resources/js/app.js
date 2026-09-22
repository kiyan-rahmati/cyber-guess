import { createApp } from 'vue';
import axios from 'axios';
import '../css/app.css';

const levels = [
    { id: 1, name: 'آسان', max: 10, icon: '🟢', desc: 'شروع آروم برای گرم شدن', base: 100, attempts: 5 },
    { id: 2, name: 'متوسط', max: 50, icon: '🔵', desc: 'حالا بازی جدی‌تر میشه', base: 250, attempts: 8 },
    { id: 3, name: 'سخت', max: 100, icon: '🟠', desc: 'حواست به حدس‌ها باشه', base: 500, attempts: 10 },
    { id: 4, name: 'لجندری', max: 1000, icon: '🔴', desc: 'فقط حرفه‌ای‌ها', base: 1000, attempts: 12 },
    { id: 5, name: 'خیلی قوی', max: 1000000, icon: '☠️', desc: 'یک میلیون عدد!', base: 5000, attempts: 20 },
];

createApp({
    data() {
        return {
            screen: 'login',
            name: '',
            unlocked: Number(localStorage.getItem('cyber-unlocked') || 1),
            current: null,
            next: null,
            secret: 0,
            guess: null,
            attempts: 0,
            message: '',
            hint: 'عددت رو وارد کن...',
            type: '',
            won: false,
            score: 0,
            players: [],
        };
    },

    methods: {
        fmt(value) {
            return new Intl.NumberFormat('fa-IR').format(value);
        },

        login() {
            if (!this.name.trim()) return alert('اول اسمت رو وارد کن.');
            this.name = this.name.trim().slice(0, 30);
            this.screen = 'levels';
        },

        isUnlocked(id) {
            return id <= this.unlocked;
        },

        play(id) {
            if (!this.isUnlocked(id)) return;

            this.current = levels.find(level => level.id === id);
            this.next = levels.find(level => level.id === id + 1) || null;
            this.secret = Math.floor(Math.random() * this.current.max) + 1;
            this.guess = null;
            this.attempts = 0;
            this.message = '';
            this.type = '';
            this.hint = 'عددت رو وارد کن...';
            this.score = 0;
            this.won = false;
            this.screen = 'game';
        },

        submit() {
            const n = Number(this.guess);

            if (!Number.isInteger(n) || n < 1 || n > this.current.max) {
                this.message = `عدد صحیح بین ۱ تا ${this.fmt(this.current.max)} وارد کن.`;
                this.type = 'error';
                return;
            }

            this.attempts++;

            if (n === this.secret) {
                this.won = true;
                this.score = this.current.base + Math.max(0, this.current.attempts - this.attempts) * 25;

                if (this.current.id === this.unlocked && this.next) {
                    this.unlocked++;
                    localStorage.setItem('cyber-unlocked', this.unlocked);
                }

                this.message = '🎯 HIT! درست حدس زدی!';
                this.type = 'success';
                this.saveScore();
                setTimeout(() => this.screen = 'result', 350);
                return;
            }

            this.hint = n < this.secret ? 'عدد مخفی بزرگ‌تره ⬆️' : 'عدد مخفی کوچک‌تره ⬇️';

            if (this.attempts >= this.current.attempts) {
                this.won = false;
                this.score = 0;
                this.hint = `عدد درست ${this.fmt(this.secret)} بود.`;
                this.saveScore();
                setTimeout(() => this.screen = 'result', 350);
                return;
            }

            this.message = `اشتباه بود؛ ${this.current.attempts - this.attempts} تلاش باقی مونده.`;
            this.type = 'warning';
            this.guess = null;
        },

        async saveScore() {
            await axios.post('/score', {
                name: this.name,
                score: this.score,
            }).catch(() => {});
        },

        async leaderboard() {
            this.screen = 'leaderboard';
            const { data } = await axios.get('/leaderboard').catch(() => ({ data: [] }));
            this.players = data;
        },

        medal(i) {
            return i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1;
        },
    },

    template: `
    <main class="app">
      <header class="hero">
        <div class="logo">CYBER<span>GUESS</span><b>_80</b></div>
        <div class="status"><i></i> SYSTEM ONLINE</div>
        <h1>حدس عدد</h1>
        <p>بازی سایبرپانکی نسل رترو — ببین تا کجا می‌تونی بری.</p>
      </header>

      <section v-if="screen==='login'" class="panel login">
        <div class="terminal">> ENTER_PLAYER_ID<span>_</span></div>
        <h2>بازیکن جدید</h2>
        <p>اسمت رو وارد کن؛ رکوردت روی جدول ذخیره میشه.</p>
        <input v-model.trim="name" maxlength="30" class="input" placeholder="مثلاً امیر" @keyup.enter="login">
        <button class="btn primary" @click="login">START GAME ▶</button>
        <button class="link" @click="leaderboard">🏆 جدول بازیکنان</button>
      </section>

      <section v-else-if="screen==='levels'" class="panel">
        <div class="bar"><span>PLAYER: <b>{{name}}</b></span><button class="mini" @click="leaderboard">🏆 LEADERBOARD</button></div>
        <div class="eyebrow">SELECT LEVEL</div>
        <h2>سطح خودت رو انتخاب کن</h2>
        <div class="levels">
          <article v-for="level in levels" :key="level.id" class="level" :class="{locked: !isUnlocked(level.id)}">
            <div class="level-top"><span>0{{level.id}}</span><strong>{{level.icon}}</strong></div>
            <h3>{{level.name}}</h3><div class="range">1 — {{fmt(level.max)}}</div>
            <p>{{level.desc}}</p>
            <button v-if="isUnlocked(level.id)" class="btn" @click="play(level.id)">PLAY LEVEL</button>
            <button v-else class="btn" disabled>🔒 LOCKED</button>
          </article>
        </div>
      </section>

      <section v-else-if="screen==='game'" class="panel game">
        <div class="bar"><button class="mini" @click="screen='levels'">← LEVELS</button><span>{{current.name}}</span><span>{{attempts}}/{{current.attempts}}</span></div>
        <div class="hud"><div><small>RANGE</small><b>1 — {{fmt(current.max)}}</b></div><div><small>LEVEL</small><b>{{current.name}}</b></div><div><small>SCORE</small><b>{{fmt(score)}}</b></div></div>
        <div class="orb"><span>HIDDEN NUMBER</span><strong>?</strong></div>
        <input v-model.number="guess" type="number" class="guess" placeholder="عددت رو وارد کن" @keyup.enter="submit">
        <button class="btn primary huge" @click="submit">⚡ حدس بزن</button>
        <div class="feedback" :class="type">{{message || 'سیگنال منتظر حدس توئه...'}}</div>
        <div class="hint">◈ {{hint}}</div>
      </section>

      <section v-else-if="screen==='result'" class="panel result">
        <div class="result-icon">{{won ? '🏆' : '☠️'}}</div>
        <div class="eyebrow">{{won ? 'MISSION COMPLETE' : 'GAME OVER'}}</div>
        <h2>{{won ? 'مرحله رو ترکوندی!' : 'این بار نشد!'}}</h2>
        <p>عدد مخفی: <b>{{fmt(secret)}}</b></p>
        <div class="final">{{fmt(score)}} <small>POINTS</small></div>
        <button v-if="won && next" class="btn primary" @click="play(next.id)">مرحله بعد 🚀</button>
        <button class="btn" @click="screen='levels'">انتخاب مرحله</button>
        <button class="link" @click="leaderboard">🏆 جدول امتیازات</button>
      </section>

      <section v-else class="panel">
        <div class="bar"><button class="mini" @click="screen=name?'levels':'login'">← BACK</button><span>🏆 LEADERBOARD</span></div>
        <div class="eyebrow">TOP PLAYERS</div><h2>قهرمان‌های سایبر</h2>
        <div class="players">
          <div v-for="(p,i) in players" class="player" :key="p.id">
            <div class="rank">{{medal(i)}}</div><div><b>{{p.name}}</b><small>{{p.games}} بازی</small></div><strong>{{fmt(p.score)}}</strong>
          </div>
          <div v-if="!players.length" class="empty">هنوز بازیکنی ثبت نشده.</div>
        </div>
      </section>

      <footer>CYBER GUESS // LARAVEL + VUE + VITE + PHP + MYSQL</footer>
    </main>
    `,
}).mount('#cyber-game');
