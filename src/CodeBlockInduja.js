import React, { useRef } from "react";
import { CodeBlock, dracula } from "react-code-blocks";
import Button from "@material-ui/core/Button";

export default function CodeBlockIndujaComponent() {
  const codeRef = useRef(null);

  const handleCopyClick = () => {
    if (codeRef.current) {
      const codeText = codeRef.current.innerText;
      navigator.clipboard.writeText(codeText);
      // You can also provide some user feedback here (e.g., a success message).
    }
  };

  return (
    <div>
      <Button onClick={handleCopyClick} variant="contained" color="secondary">
        Copy
      </Button>
      <div className="code-block-container" ref={codeRef}>
        <CodeBlock
          text={`
        // SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.7.0;

library LowGasSafeMath {

    /// @return z The sum of x and y
    function add(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require((z = x + y) >= x);
    }


    /// @return z The difference of x and y
    function sub(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require((z = x - y) <= x);
    }


    /// @return z The product of x and y
    function mul(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(x == 0 || (z = x * y) / x == y);
    }


    /// @return z The sum of x and y
    function add(int256 x, int256 y) internal pure returns (int256 z) {
        require((z = x + y) >= x == (y >= 0));
    }


    /// @return z The difference of x and y
    function sub(int256 x, int256 y) internal pure returns (int256 z) {
        require((z = x - y) <= x == (y >= 0));
    }
}
        `}
          language="solidity"
          theme={dracula}
        />
      </div>
    </div>
  );
}
