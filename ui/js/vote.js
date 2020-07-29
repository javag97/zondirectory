async function vote() {
    if(!$('#form').valid()) return;

    const amount = prompt("Vote amount (in ETH):", '0.1');
    if(!amount) return;

    const child = $('#child').val();
    const parent = $('#parent').val().replace(/:.*/, "");
    const yes = $('[name=dir][value=for]').is(":checked");

    await defaultAccountPromise();
    const contractInstance = new web3.eth.Contract(await filesJsonInterface(), await getAddress('Files'));
    await contractInstance.methods.voteChildParent(child, parent, yes, '0x0000000000000000000000000000000000000001')
        .send({from: defaultAccount, value: web3.utils.toWei(amount), gas: '1000000'}, (error, result) => {
            if(error) return;
            alert("You voted " + $('[name=dir][value=for]').val());
        });
}

function onLoad() {
    const child = numParam('child');
    const parent = numParam('parent');
    const urlParams = new URLSearchParams(window.location.search);
    const dir = urlParams.get('dir');
    if(child) $('#child').val(child);
    if(parent) $('#parent').val(parent);
    $(`[name=dir][value=${dir}]`).prop('checked', true);
    $('.category').categoryChooser();

    $('#form').validate({});
}

window.addEventListener('load', onLoad);