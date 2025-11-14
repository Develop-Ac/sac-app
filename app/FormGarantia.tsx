
"use client";
import React, { useState } from "react";

const motivos = [
  "Produto Avariado",
  "Produto faltante",
  "Defeito de Fabricação",
  "Troca de mercadoria (Desistência de compra ou produto incorreto)",
];

const FormGarantia = () => {
  const [form, setForm] = useState({
    tipoPessoa: "juridica", // "juridica" ou "fisica"
    razaoSocial: "",
    cnpj: "",
    notaFiscal: "",
    adicionarMaisItens: false,
    itens: [
      {
        item: "",
        quantidade: "",
        motivo: "",
        files: {},
      },
    ],
  });

  // Manipula campos do formulário principal
  const handleMainChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Manipula campos de cada item
  const handleItemChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    setForm((prev) => {
      const newItens = [...prev.itens];
      if (type === "file") {
        newItens[index].files = {
          ...newItens[index].files,
          [name]: files ? Array.from(files) : [],
        };
      } else {
        newItens[index] = {
          ...newItens[index],
          [name]: value,
        };
      }
      return { ...prev, itens: newItens };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Monta o payload para envio
    const payload = {
      tipoPessoa: form.tipoPessoa,
      razaoSocial: form.razaoSocial,
      cnpj: form.cnpj,
      notaFiscal: form.notaFiscal,
      itens: form.itens.map((item) => ({
        item: item.item,
        quantidade: item.quantidade,
        motivo: item.motivo,
        files: item.files,
      })),
    };
    console.log("Payload do formulário:", payload);
    alert("Formulário enviado! Veja o payload no console.");
  };

  // Campos de fotos por motivo
  const camposFotos: Record<string, Array<{ label: string; name: string; multiple?: boolean; accept?: string }>> = {
    "Produto Avariado": [
      { label: "Conhecimento de Transporte Assinado", name: "transporte_assinado", accept: "image/*" },
      { label: "Fotos da embalagem da Mercadoria", name: "embalagem_mercadoria", multiple: true, accept: "image/*" },
      { label: "Fotos da mercadoria avariada", name: "mercadoria_avariada", multiple: true, accept: "image/*" },
      { label: "Fotos da Marcação da AC na mercadoria", name: "marcacao_ac", accept: "image/*" },
    ],
    "Produto faltante": [
      { label: "Conhecimento de Transporte Assinado", name: "transporte_assinado", accept: "image/*" },
    ],
    "Defeito de Fabricação": [
      { label: "Fotos e Vídeos do defeito identificado", name: "defeito_identificado", multiple: true, accept: "image/*,video/*" },
      { label: "Foto da Marcação da AC no produto", name: "marcacao_ac", accept: "image/*" },
    ],
    "Troca de mercadoria (Desistência de compra ou produto incorreto)": [
      { label: "Fotos da mercadoria", name: "mercadoria_troca", multiple: true, accept: "image/*" },
      { label: "Fotos da Marcação da AC no produto", name: "marcacao_ac", accept: "image/*" },
    ],
  };

  return (
    <section className="service-container max-w-2xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8" aria-label="Seção de itens de serviço">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="service-item-details flex gap-6 items-center">
          <div className="service-image-container">
            <img
              alt="Imagem de item de serviço para Criar devolução"
              loading="lazy"
              src="https://globalplasticbr.attachments.freshservice.com/25359000073/medium/icone-2.png?Expires=1763130627&Signature=fVYRMr0qKcI~W4hZPvsUiE-vEYQfCHlRM3bk6CoDFCEleQrWAO~N5TlVvS1HCbCoOHFH1Nw6Cr0IU4z8cilqUUKjTD-qXato4CaHehgPMUqsSYR4-2a2ejFYLAurEiYznWjlGcw~HO0HwVGPh2EfhFQ85pTzmyuLwaMDzg6hOMrgytGiixH~m2HMWS0pAprV60FU0PEqQE3o8Rkkgsa4C395hOgr2tcp04uuXahbKm4z6hNJQZ~MtuafI4EEQGoszxGicuj7WCXN10MxXQamO11e8LUNYygrcE0prMG4vdinw5egqXXsCj4HsBNXHOgTDbqK9TxQ0kF3A84oidp0pQ__&Key-Pair-Id=APKAIPHBXWY2KT5RCMPQ"
              className="w-20 h-20 object-contain rounded-lg border"
            />
          </div>
          <article className="service-details" aria-label="Criar devolução Informações do item de serviço">
            <h2 tabIndex={-1} className="service-item-name text-xl font-bold text-blue-700">Criar devolução</h2>
            <div className="service-description hide-on-mobile">
              <div className="short font-semibold">Devolução</div>
              <div className="long text-gray-600"><p>Registrar uma nova devolução.</p></div>
            </div>
          </article>
        </div>
        <div className="service-description show-on-mobile md:hidden block">
          <div className="short font-semibold">Devolução</div>
          <div className="long text-gray-600"><p>Registrar uma nova devolução.</p></div>
        </div>
        <div className="service-splitter my-6 border-t border-gray-200" role="presentation"></div>
        <div className="fields grid gap-4">
          <div className="custom_dropdown dropdown custom-field">
            <label className="block font-medium" htmlFor="tipoPessoa">Tipo de pessoa <sup className="text-red-500">*</sup></label>
            <select name="tipoPessoa" id="tipoPessoa" value={form.tipoPessoa} onChange={handleMainChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option value="juridica">Pessoa Jurídica</option>
              <option value="fisica">Pessoa Física</option>
            </select>
          </div>
          <div className="custom_text field text custom-field">
            <label className="block font-medium" htmlFor="razaoSocial">{form.tipoPessoa === "juridica" ? "Razão social" : "Nome"} <sup className="text-red-500">*</sup></label>
            <input type="text" name="razaoSocial" id="razaoSocial" required value={form.razaoSocial} onChange={handleMainChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div className="custom_big_number field number custom-field">
            <label className="block font-medium" htmlFor="cnpj">{form.tipoPessoa === "juridica" ? "CNPJ" : "CPF"} <sup className="text-red-500">*</sup></label>
            <input type="text" name="cnpj" id="cnpj" required value={form.cnpj} onChange={handleMainChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div className="custom_text field text custom-field">
            <label className="block font-medium" htmlFor="notaFiscal">Nota fiscal <sup className="text-red-500">*</sup></label>
            <input type="text" name="notaFiscal" id="notaFiscal" required value={form.notaFiscal} onChange={handleMainChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          {form.itens.map((itemObj, idx) => (
            <div key={idx} className="border rounded-lg p-4 mb-2 bg-gray-50">
              <div className="custom_text field text custom-field">
                <label className="block font-medium" htmlFor={`item-${idx}`}>Item GlobalPlastic <sup className="text-red-500">*</sup></label>
                <input type="text" name="item" id={`item-${idx}`} required value={itemObj.item} onChange={e => handleItemChange(idx, e)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div className="custom_big_number field number custom-field">
                <label className="block font-medium" htmlFor={`quantidade-${idx}`}>Quantidade <sup className="text-red-500">*</sup></label>
                <input type="text" name="quantidade" id={`quantidade-${idx}`} required value={itemObj.quantidade} onChange={e => handleItemChange(idx, e)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div className="custom_dropdown dropdown custom-field">
                <label className="block font-medium" htmlFor={`motivo-${idx}`}>Motivo <sup className="text-red-500">*</sup></label>
                <select name="motivo" id={`motivo-${idx}`} required value={itemObj.motivo} onChange={e => handleItemChange(idx, e)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option value="">Selecione</option>
                  {motivos.map((motivo) => (
                    <option key={motivo} value={motivo}>{motivo}</option>
                  ))}
                </select>
              </div>
              {/* Campos de fotos dinâmicos conforme motivo do item */}
              {itemObj.motivo && camposFotos[itemObj.motivo] && (
                <div className="grid gap-4 mt-2">
                  {camposFotos[itemObj.motivo].map((campo) => (
                    <div key={campo.name} className="custom_text field text custom-field">
                      <label className="block font-medium" htmlFor={`${campo.name}-${idx}`}>{campo.label} <sup className="text-red-500">*</sup></label>
                      <input
                        type="file"
                        name={campo.name}
                        id={`${campo.name}-${idx}`}
                        required
                        multiple={campo.multiple}
                        accept={campo.accept}
                        onChange={e => handleItemChange(idx, e)}
                        className="mt-1 block w-full"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="custom_checkbox field checkbox custom-field flex items-center gap-2">
            <input type="checkbox" name="adicionarMaisItens" id="adicionarMaisItens" checked={form.adicionarMaisItens} onChange={handleMainChange} className="checkbox field" />
            <label htmlFor="adicionarMaisItens">Adicionar mais itens?</label>
          </div>
          {form.adicionarMaisItens && (
            <button type="button" className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 transition" onClick={() => setForm(f => ({ ...f, itens: [...f.itens, { item: "", quantidade: "", motivo: "", files: {} }] }))}>
              Adicionar novo item
            </button>
          )}
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition">Enviar</button>
      </form>
    </section>
  );
};

export default FormGarantia;
