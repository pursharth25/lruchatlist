class LinkedList
{
    data;
    next;
    constructor(data) 
    {
        this.data=data
        this.next=null
    }
}
let new_data = (value, node) => {
    const newone = new LinkedList(value)
    if (node == null) {
        return newone;
    }
    newone.next = node
    node = newone
    return node;
}
let exist_node_shift = (node, value) => {
    c = node;
    p = null;
    while (c !== null) {
        if (c.data[0] == value[0]) {
            break;
        }
        p = c;
        c = c.next;
    }
    if (c == null) {
        return -1;
    }
    if (p == null) {
        node.data[1] = value[1]
        return 0;
    }
    p.next = c.next;
    return 1;
}
let LRU_deletion = (node) => {
    c = node
    while (c.next.next != null) {
        c = c.next;
    }
    c.next = null;
    return node
}
let count = 3;
let chatbox = document.querySelector("#chatbox")
let traverse = (node) => {
    let d = node
    chatbox.innerHTML = ``
    while (d != null) {
        if(d.data[1].length>25)
        {
            d.data[1] = d.data[1].substring(0,25) + ".......";
        }
        let content = document.createElement("ul")
        content.className="ks-items"
        content.innerHTML = `
        <li class="ks-item" id="ChatListItem">
            <a href="#">
            <span class="ks-avatar">
                <img src="./default-user.png" width="36" height="36" id="Image"></img>
            </span>
                <div class="ks-body">
                    <div class="ks-name">
                        <span id="Name">${d.data[0]}</span>
                        <span id="Time" class="ks-datetime">${new Date().getHours() + ":" + new Date().getMinutes()}</span>
                    </div>
                    <div class="ks-message" id="Message">${d.data[1]}</div>
                </div>
            </a>
        </li>`
        chatbox.appendChild(content)
        d = d.next
    }
}
let Chatnode = new LinkedList(["Priyam", "Hi!Whassup,Priyam here?"]);
Chatnode = new_data(["Aman", "hey, aman here!"], Chatnode)
Chatnode = new_data(["Anupam", "Hello, Anumpam Here!"], Chatnode)
traverse(Chatnode)

document.querySelector("#send").addEventListener("click", () => {
    let name = document.getElementById("contactlist").value
    let message = document.getElementById("message").value
    if (message) {
        if (count == 5) {
            let indicator = exist_node_shift(Chatnode, [name, message]);
            if (indicator == -1) {
                Chatnode = LRU_deletion(Chatnode)
                console.log(Chatnode)
                Chatnode = new_data([name, message], Chatnode)
                traverse(Chatnode)
            }
            else if (indicator == 1) {
                Chatnode = new_data([name, message], Chatnode)
                traverse(Chatnode)
            }
            else {
                traverse(Chatnode)
            }
        }
        else {
            let indicator = exist_node_shift(Chatnode, [name, message]);
            if (indicator == -1) {
                count += 1;
                Chatnode = new_data([name, message], Chatnode)
                traverse(Chatnode)
            }
            else if (indicator == 1) {
                Chatnode = new_data([name, message], Chatnode)
                traverse(Chatnode)
            }
            else {
                traverse(Chatnode)
            }
        }
    }
})