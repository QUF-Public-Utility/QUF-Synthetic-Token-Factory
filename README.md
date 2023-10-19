# Synthetic Token Factory

This project is a Synthetic Token Factory using Ethereum smart contracts that are ERC-20 and ERC-2535 compliant. It includes a CI/CD pipeline for automated testing and deployment.

## Project Structure

The project is structured as follows:

- `ERC20.sol`: This is the ERC-20 compliant Synthetic Token contract.
- `ERC2535.sol`: This is the ERC-2535 compliant Synthetic Token Factory contract.
- `test/`: This directory contains the tests for the smart contracts.
- `backend/`: This directory contains the backend API for interacting with the smart contracts.
- `frontend/`: This directory contains the frontend for the application.
- `.github/workflows/ci-cd.yml`: This is the configuration file for the CI/CD pipeline.
- `hardhat.config.js`: This is the configuration file for Hardhat.

## Setup

To setup the project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/Synthetic-Token-Factory.git
    cd Synthetic-Token-Factory
    ```

2. Install the dependencies:
    ```bash
    yarn install
    ```

3. Compile the contracts:
    ```bash
    yarn compile
    ```

## Testing

To run the tests, use the following command:

```bash
yarn test
```

## Deployment

To deploy the contracts to the testnet, use the following command:

```bash
yarn deploy:testnet
```

To verify the contracts on Etherscan for the testnet, use the following command:

```bash
yarn verify:testnet
```

To deploy the contracts to the mainnet, use the following command:

```bash
yarn deploy:mainnet
```

To verify the contracts on Etherscan for the mainnet, use the following command:

```bash
yarn verify:mainnet
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[ISC](https://choosealicense.com/licenses/isc/)
