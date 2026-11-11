(function () {
  var cfg = window.ROOTED || {};
  var headers = {
    apikey: cfg.key,
    Authorization: "Bearer " + cfg.key
  };

  function rest(path, options) {
    var opts = options || {};
    if (!opts.headers) opts.headers = headers;
    return fetch(cfg.url + "/rest/v1/" + path, opts).then(function (res) {
      return res.text().then(function (body) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        if (!body) return null;
        return JSON.parse(body);
      });
    });
  }

  function text(node, value) {
    if (node && value) node.textContent = value;
  }

  function oneQuote(rows) {
    if (!rows || !rows.length) return null;
    var day = Math.floor(Date.now() / 86400000);
    return rows[day % rows.length];
  }

  function fillSettings(row) {
    if (!row) return;
    text(document.getElementById("tagline"), row.tagline);
    text(document.getElementById("harbor-summary"), row.safe_harbor_summary);
    text(document.getElementById("giveback-summary"), row.giveback_summary);
    text(document.getElementById("statute-name"), row.statute);
    var call = document.getElementById("call");
    var wa = document.getElementById("whatsapp");
    if (call && row.phone_e164) {
      call.href = "tel:" + row.phone_e164;
      call.textContent = "Text TJ " + row.phone_display;
    }
    if (wa && row.whatsapp_url) wa.href = row.whatsapp_url;
    var mail = document.getElementById("mail");
    if (mail && row.email) {
      mail.href = "mailto:" + row.email;
      mail.textContent = row.email;
    }
  }

  function fillQuote(row) {
    var box = document.getElementById("quote");
    if (!box || !row) return;
    box.textContent = "";
    var line = document.createElement("span");
    line.textContent = row.body;
    var cite = document.createElement("cite");
    cite.textContent = row.reference;
    box.appendChild(line);
    box.appendChild(cite);
  }

  function fillServices(rows) {
    var list = document.getElementById("service-list");
    if (!list || !rows || !rows.length) return;
    list.textContent = "";
    rows.forEach(function (row, i) {
      var card = document.createElement("article");
      var pops = ["shadow-[8px_8px_0_#ffc400]", "shadow-[8px_8px_0_#3cf0ff]", "shadow-[8px_8px_0_#ff2bd6]", "shadow-[8px_8px_0_#d6ff4a]"];
      card.className = "group relative overflow-hidden border border-white/10 bg-zinc-950/80 p-5 transition duration-700 ease-out hover:-translate-y-1.5 hover:border-white/40 " + pops[i % pops.length];
      var num = document.createElement("p");
      num.className = "font-cond text-sm font-bold tracking-[0.16em] text-gold";
      num.textContent = String(i + 1).padStart(2, "0") + (row.jurisdiction ? "  ·  " + row.jurisdiction + " only" : "");
      var title = document.createElement("h3");
      title.className = "mt-2 font-display text-lg text-paper";
      title.textContent = row.title;
      var body = document.createElement("p");
      body.className = "mt-2 text-sm leading-relaxed text-zinc-300";
      body.textContent = row.summary;
      card.appendChild(num);
      card.appendChild(title);
      card.appendChild(body);
      list.appendChild(card);
    });
  }

  function fillSocials(rows) {
    var list = document.getElementById("social-list");
    if (!list || !rows || !rows.length) return;
    list.textContent = "";
    rows.forEach(function (row) {
      var item = document.createElement("li");
      var link = document.createElement("a");
      link.href = row.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = row.label;
      link.className = "inline-block px-3 py-2 font-cond text-sm font-bold uppercase tracking-[0.08em] text-ink shadow-[3px_3px_0_#000] transition duration-500 hover:-translate-y-0.5";
      if (row.label === "GoFundMe") link.className += " bg-gold";
      else if (row.label === "WhatsApp") link.className += " bg-limepop";
      else link.className += " bg-brand";
      item.appendChild(link);
      list.appendChild(item);
    });
  }

  function fillGiveback(row) {
    if (!row) return;
    var toward = Number(row.toward_next || 0);
    var per = Number(row.per || 10);
    text(document.getElementById("toward"), String(toward));
    text(document.getElementById("per"), String(per));
    text(document.getElementById("businesses"), String(row.businesses || 0));
    text(document.getElementById("slots-open"), String(row.slots_open || 0));
    text(document.getElementById("schools"), String(row.schools || 0));
    text(document.getElementById("churches"), String(row.churches || 0));
    var ticks = document.getElementById("ticks");
    if (!ticks) return;
    ticks.textContent = "";
    for (var i = 0; i < per; i++) {
      var mark = document.createElement("i");
      mark.className = i < toward ? "block h-2 w-5 bg-brand" : "block h-2 w-5 border border-brand/40";
      ticks.appendChild(mark);
    }
  }

  function fillPrices(rows) {
    var body = document.getElementById("price-rows");
    var empty = document.getElementById("price-empty");
    if (!body) return;
    if (!rows || !rows.length) {
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;
    body.textContent = "";
    rows.forEach(function (row) {
      var tr = document.createElement("tr");
      [row.category, row.item, row.price_text, row.source_name].forEach(function (value) {
        var td = document.createElement("td");
        td.textContent = value || "";
        tr.appendChild(td);
      });
      var linkCell = document.createElement("td");
      if (row.source_url) {
        var a = document.createElement("a");
        a.href = row.source_url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = "Source";
        linkCell.appendChild(a);
      }
      tr.appendChild(linkCell);
      body.appendChild(tr);
    });
  }

  function load() {
    if (!cfg.url || !cfg.key) return;
    rest("site_settings?select=*&limit=1").then(function (rows) {
      fillSettings(rows && rows[0]);
    }).catch(function () {});
    rest("services?select=title,summary,jurisdiction,sort_order&published=eq.true&order=sort_order.asc").then(fillServices).catch(function () {});
    rest("social_links?select=label,url,sort_order&published=eq.true&order=sort_order.asc").then(fillSocials).catch(function () {});
    rest("bible_quotes?select=reference,body&published=eq.true&order=id.asc").then(function (rows) {
      fillQuote(oneQuote(rows));
    }).catch(function () {});
    rest("competitor_prices?select=category,item,price_text,source_name,source_url&published=eq.true&order=captured_at.desc").then(fillPrices).catch(function () {});
    rest("rpc/giveback_public", {
      method: "POST",
      headers: Object.assign({ "Content-Type": "application/json" }, headers),
      body: "{}"
    }).then(fillGiveback).catch(function () {});
  }

  function formFallback(form) {
    var data = new FormData(form);
    return fetch(cfg.formspree, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data
    });
  }

  var form = document.getElementById("lead-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var note = document.getElementById("form-note");
      var email = form.email.value.trim();
      var phone = form.phone.value.trim();
      if (!email && !phone) {
        text(note, "Add a phone number or an email so TJ can answer.");
        return;
      }
      var payload = {
        name: form.name.value.trim(),
        email: email || null,
        phone: phone || null,
        interest: form.interest.value,
        county: form.county.value.trim() || null,
        reach: form.reach.value,
        message: form.message.value.trim()
      };
      text(note, "Sending.");
      rest("leads", {
        method: "POST",
        headers: Object.assign({
          "Content-Type": "application/json",
          Prefer: "return=minimal"
        }, headers),
        body: JSON.stringify(payload)
      }).then(function () {
        form.reset();
        text(note, "Saved. TJ has it on the phone.");
        var thanks = document.getElementById("thanks");
        if (thanks) thanks.hidden = false;
      }).catch(function () {
        formFallback(form).then(function (res) {
          if (!res.ok) throw new Error("fallback");
          form.reset();
          text(note, "Got it. TJ will answer from (509) 714-9513.");
        }).catch(function () {
          text(note, "The form did not send. Text TJ at (509) 714-9513 or on WhatsApp.");
        });
      });
    });
  }

  load();
})();
