pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GenerateFish is ERC721 {
    constructor() ERC721("fish", "FISH") public {
    }
    using Counters for Counters.Counter;
        Counters.Counter private _tokenIds;
        mapping(string => uint8) hashes;

    uint[] public tokens;

    function mint(string memory hash, string memory metadata) public payable returns (uint256) { //address recipient
        require(hashes[hash] != 1);
        hashes[hash] = 1;
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, metadata);
        tokens.push(newItemId);
        return newItemId;
    }
}