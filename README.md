# PlaywrightTypeScriptDemo
## Setup Instructions

### Prerequisites
- Node.js (>= 12.x)
- npm (>= 6.x) or yarn (>= 1.x)

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/PlaywrightTypeScriptDemo.git
    cd PlaywrightTypeScriptDemo
    ```

2. Install dependencies:
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

### Running Tests
1. Run the tests:
    ```bash
    npx playwright test
    ```
    or
    ```bash
    yarn playwright test
    ```

2. View the test report:
    ```bash
    npx playwright show-report
    ```
    or
    ```bash
    yarn playwright show-report
    ```

### Additional Commands
- To run a specific test file:
    ```bash
    npx playwright test path/to/test-file.spec.ts
    ```
    or
    ```bash
    yarn playwright test path/to/test-file.spec.ts
    ```

- To update Playwright browsers:
    ```bash
    npx playwright install
    ```
    or
    ```bash
    yarn playwright install
    ```