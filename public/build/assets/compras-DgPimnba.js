document.addEventListener(`DOMContentLoaded`,()=>{let e=[],t=document.getElementById(`purchase-details-container`),n=document.getElementById(`total-display`),r=document.getElementById(`total-input`);document.addEventListener(`click`,e=>{let t=e.target?.closest(`.btn-add-product`);if(t&&!t.disabled){let e=t.dataset.id,n=t.dataset.code,r=t.dataset.description;t.disabled=!0,t.classList.add(`opacity-50`,`cursor-not-allowed`),t.textContent=`Agregado`,i(e,n,r)}});function i(t,n,r){let i=e.find(e=>e.id===t);i?i.quantity+=1:e.push({id:t,code:n,description:r,quantity:1,price:0}),a()}t&&t.addEventListener(`click`,t=>{let n=t.target?.closest(`.btn-remove-item`);if(n){let t=n.dataset.id;e=e.filter(e=>e.id!==t);let r=document.querySelector(`.btn-add-product[data-id="${t}"]`);r&&(r.disabled=!1,r.classList.remove(`opacity-50`,`cursor-not-allowed`),r.textContent=`Agregar`),a()}});function a(){if(!t)return;t.innerHTML=``;let n=0;e.forEach((e,r)=>{let i=e.quantity*e.price;n+=i;let a=e.selling_price??e.price??0,o=document.createElement(`div`);o.classList.add(`mb-2`),o.innerHTML=`
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-white border border-gray-200 rounded-lg shadow-xs hover:border-gray-300 transition-colors">
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold text-gray-800 truncate">${e.description}</p>
                        <span class="text-xs font-mono text-gray-500">Cód: ${e.code}</span>
                        <input type="hidden" name="items[${r}][product_id]" value="${e.id}">
                    </div>

                    <div class="flex items-end gap-3">
                        <!-- Cantidad -->
                        <div class="w-16">
                            <label class="sr-only">Cantidad</label>
                            <input type="number"
                                name="items[${r}][quantity]"
                                class="input-quantity block w-full rounded-md border border-gray-300 bg-gray-50 p-1.5 text-center text-sm font-medium text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                data-index="${r}"
                                value="${e.quantity}"
                                min="1"
                                placeholder="Cant.">
                        </div>

                        <!-- Precio Unitario -->
                        <div class="relative w-20">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5">
                                <span class="text-xs font-medium text-gray-500">Bs.</span>
                            </div>
                            <input type="number"
                                step="0.01"
                                name="items[${r}][price]"
                                class="input-price block w-full rounded-md border border-gray-300 bg-gray-50 py-1.5 pl-8 pr-2 text-right text-sm font-medium text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                data-index="${r}"
                                value="${e.price}"
                                placeholder="0.00">
                        </div>
                        <!-- Nuevo Precio de Venta al Público -->
                        <div class="relative w-20">
                            <span class="text-[10px] font-semibold text-blue-600 block leading-tight">P. Venta</span>
                            <div class="relative mt-0.5">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                                    <span class="text-xs font-medium text-blue-600">Bs.</span>
                                </div>
                                <input type="number"
                                    step="0.01"
                                    name="items[${r}][selling_price]"
                                    class="input-selling-price block w-full rounded-md border border-blue-200 bg-blue-50/50 py-1 pl-7 pr-1.5 text-right text-sm font-medium text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    data-index="${r}"
                                    value="${a}"
                                    placeholder="0.00">
                            </div>
                        </div>

                        <!-- Subtotal -->
                        <div class="w-18 text-right">
                            <span class="text-xs text-gray-400 block font-normal">Subtotal</span>
                            <span class="text-sm font-semibold text-gray-800 subtotal-display" data-index="${r}">
                                ${i.toFixed(2)}
                            </span>
                        </div>

                        <!-- Botón Eliminar -->
                        <button type="button"
                            class="btn-remove-item flex h-8 w-8 items-center justify-center rounded-md bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                            data-id="${e.id}"
                            title="Eliminar producto">
                            <svg class="h-4 w-4 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            `,t.appendChild(o)}),o(n)}t&&t.addEventListener(`input`,t=>{let n=t.target,r=n.dataset.index;if(r===void 0)return;let i=e[Number.parseInt(r,10)];if(!i)return;n.classList.contains(`input-quantity`)?i.quantity=Number.parseFloat(n.value)||0:n.classList.contains(`input-price`)&&(i.price=Number.parseFloat(n.value)||0);let a=i.quantity*i.price,s=n.closest(`.flex`);if(s){let e=s.querySelector(`.subtotal-display`);e&&(e.textContent=a.toFixed(2))}o(e.reduce((e,t)=>e+t.quantity*t.price,0))});function o(e){n&&(n.textContent=e.toFixed(2)),r&&(r.value=e.toFixed(2))}document.addEventListener(`click`,async e=>{let t=e.target?.closest(`.btn-cancel-purchase`);if(!t)return;let n=t.dataset.id;if((await Swal.fire({title:`¿Estás seguro de anular esta compra?`,text:`Esta acción cambiará el estado a anulada y revertirá el stock ingresado.`,icon:`warning`,showCancelButton:!0,confirmButtonColor:`#ef4444`,cancelButtonColor:`#6b7280`,confirmButtonText:`Sí, anular compra`,cancelButtonText:`Cancelar`})).isConfirmed)try{let e=document.querySelector(`meta[name="csrf-token"]`)?.getAttribute(`content`),t=await fetch(`/admin/purchases/${n}`,{method:`PUT`,headers:{"Content-Type":`application/json`,Accept:`application/json`,"X-Requested-With":`XMLHttpRequest`,"X-CSRF-TOKEN":e},body:JSON.stringify({status:`canceled`})}),r=t.headers.get(`content-type`),i={};if(r&&r.includes(`application/json`))i=await t.json();else throw Error(`El servidor respondió con estado ${t.status} sin formato JSON.`);if(t.ok&&i.success)typeof window.showToast==`function`&&window.showToast(`success`,i.message),setTimeout(()=>window.location.reload(),1e3);else throw Error(i.message||`Error al procesar la anulación.`)}catch(e){typeof window.showToast==`function`&&window.showToast(`error`,e.message)}})});var e=Swal.mixin({toast:!0,position:`top-end`,showConfirmButton:!1,timer:3e3,timerProgressBar:!0,didOpen:e=>{e.addEventListener(`mouseenter`,Swal.stopTimer),e.addEventListener(`mouseleave`,Swal.resumeTimer)}});window.showToast=(t,n)=>{e.fire({icon:t,title:n})};var t=document.getElementById(`purchase-detail-modal`),n=document.getElementById(`close-modal-btn`);t&&(document.addEventListener(`click`,async e=>{let n=e.target?.closest(`.btn-show-purchase`);if(!n)return;let r=n.dataset.id;try{let e=await fetch(`/admin/purchases/${r}`);if(!e.ok)throw Error(`Error al obtener el detalle`);let n=await e.json();document.getElementById(`modal-purchase-id`).textContent=n.id,document.getElementById(`modal-purchase-date`).textContent=new Date(n.purchase_date).toLocaleDateString(),document.getElementById(`modal-purchase-total`).textContent=Number.parseFloat(n.total).toFixed(2);let i=document.getElementById(`modal-items-body`);i.innerHTML=``,n.products.forEach(e=>{let t=e.pivot.quantity,n=Number.parseFloat(e.pivot.price),r=(t*n).toFixed(2),a=`
                    <tr class="hover:bg-gray-50">
                        <td class="px-4 py-3 font-semibold text-gray-700">${e.codigo}</td>
                        <td class="px-4 py-3">${e.description}</td>
                        <td class="px-4 py-3 text-center">${t}</td>
                        <td class="px-4 py-3 text-right">${n.toFixed(2)} Bs.</td>
                        <td class="px-4 py-3 text-right font-semibold text-gray-900">${r} Bs.</td>
                    </tr>
                `;i.insertAdjacentHTML(`beforeend`,a)}),t.classList.remove(`hidden`)}catch(e){console.error(e),typeof window.showToast==`function`&&window.showToast(`error`,`No se pudo cargar el detalle de la compra.`)}}),n&&n.addEventListener(`click`,()=>t.classList.add(`hidden`)),t.addEventListener(`click`,e=>{e.target===t&&t.classList.add(`hidden`)}));