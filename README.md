# MindfulMuse

🧠 **AI-Powered Creative Canvas for Writers, Musicians & Designers**

MindfulMuse is an interactive creative suite built with C# and Blazor WebAssembly, featuring an Azure serverless backend. It provides a unified platform for creative expression with AI assistance, designed to run indefinitely within Azure's always-free tier limits.

## ✨ Features

### Writing Module
- **Rich Text Editor** with formatting tools and AI suggestions
- **AI-Powered Writing Assistance** using Google's Gemini API
- **Export Options** (Word, PDF, Markdown)
- **Writing Analysis Tools** (sentiment, grammar, readability)

### Music Module
- **Chord Progression Builder** with Roman numeral notation
- **Melody Input Interface** and audio recording
- **Music Notation Display** using VexFlow
- **Audio Export** (MIDI, PDF, WAV)
- **Harmony Preview** with Tone.js integration

### Design Module
- **Color Palette Manager** with image-based extraction
- **Mood Board Canvas** with Excalidraw integration
- **Image Upload** with drag-and-drop support
- **Palette Export** and color swatch management

## 🏗️ Architecture

- **Frontend**: Blazor WebAssembly with Bootstrap styling
- **Backend**: Azure Functions (serverless) with Azure Storage
- **Database**: Azure Cosmos DB for metadata
- **AI**: Google Gemini API for text suggestions
- **File Storage**: Azure Blob Storage with SAS tokens
- **Deployment**: Azure Static Web Apps

## 🚀 Quick Start

### Prerequisites
- .NET 8 SDK
- Azure CLI (authenticated)
- Azure Functions Core Tools
- Visual Studio Code with C# and Blazor extensions

### Local Development
1. Clone the repository
2. Navigate to the project directory
3. Run the application:
   ```bash
   dotnet run
   ```
4. Open https://localhost:5001 in your browser

### Azure Deployment
1. Create Azure resources following naming conventions
2. Configure Azure Static Web Apps
3. Deploy using Azure CLI or GitHub Actions

## 📁 Project Structure

```
MindfulMuse/
├── Pages/                 # Blazor pages (Writing, Music, Design)
├── Layout/               # Main layout components
├── wwwroot/              # Static assets and JS libraries
├── MindfulMuse.csproj    # Project configuration
├── PLAN.md              # Detailed project planning
├── project-setup.md     # Setup and conventions
└── TODO.md              # Development roadmap
```

## 🔧 Configuration

### Azure Resources (Naming Convention: `mm-[env]-[type]-[instance]`)

- **Resource Group**: `mm-dev-rg-001`
- **Static Web App**: `mm-dev-swa-001`
- **Function App**: `mm-dev-func-[name]-001`
- **Cosmos DB**: `mm-dev-cosmos-metadata-001`
- **Blob Storage**: `mm-dev-blob-001`

### Environment Variables
```
AZURE_FUNCTIONS_ENVIRONMENT=Development
AZURE_STORAGE_CONNECTION_STRING=...
COSMOS_DB_CONNECTION_STRING=...
GEMINI_API_KEY=...
```

## 📊 Cost Management

MindfulMuse is designed to run within Azure's always-free tier:
- **Azure Functions**: 1M executions/month
- **Azure Blob Storage**: 5GB storage
- **Azure Cosmos DB**: 1K RU/s throughput
- **Azure Static Web Apps**: Free hosting

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines and contribution process.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Roadmap

- **Phase 1**: MVP with core features (Writing, Music, Design modules)
- **Phase 2**: Beta features (RAG, collaboration, monitoring)
- **Phase 3**: Growth & monetization (paid features, scaling)

## 📞 Support

- **Documentation**: PLAN.md, project-setup.md
- **Issues**: GitHub Issues
- **Azure Support**: Azure Portal

---

**Built with ❤️ using C#, Blazor, and Azure**
