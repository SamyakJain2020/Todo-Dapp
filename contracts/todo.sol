//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
contract Todo {
    // address
    // heading
    // desc
    // time
    // done/not-done
    enum  status{ NOTDONE,DONE,PARTIAL}

    struct todo{
        address payable user;
        string heading;
        string desc;
        status s;
        // time 2do
    // block.timestamp
    }

    todo[] public todos;
    function setTodo(string memory _heading,string memory _desc) public returns(todo[] memory){
        todo memory t;
        t.user = payable(msg.sender);
        t.heading=_heading;
        t.desc=_desc;
        t.s=status.NOTDONE;
        // uint len=todos.length();
        todos.push(t);
        return todos;
    }
    function getTodos() view public returns( todo[]  memory){
        return todos;
    }
    // toggle done -notDone
    // update
    // NFT
}