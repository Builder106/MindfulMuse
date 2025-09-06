# Contributing to MindfulMuse

Thank you for your interest in contributing to MindfulMuse! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:
- **.NET 8 SDK** - Download from [dotnet.microsoft.com](https://dotnet.microsoft.com/download)
- **Azure CLI** - Install from [docs.microsoft.com/azure/cli](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
- **Azure Functions Core Tools** - Install from [docs.microsoft.com/azure/azure-functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local)
- **Visual Studio Code** with extensions:
  - C# Dev Kit
  - Blazor
  - Azure Tools

### Local Development Setup
1. Fork and clone the repository
2. Navigate to the project directory
3. Restore dependencies:
   ```bash
   dotnet restore
   ```
4. Run the application:
   ```bash
   dotnet run
   ```
5. Open https://localhost:5001 in your browser

## 📋 Development Workflow

### 1. Choose a Task
- Check the [TODO.md](TODO.md) file for current tasks
- Look for issues labeled `good first issue` or `help wanted`
- Comment on an issue to indicate you're working on it

### 2. Create a Feature Branch (Optional)
```bash
git checkout -b feature/your-feature-name
```

### 3. Make Changes
- Follow the existing code style and patterns
- Write clear, descriptive commit messages
- Test your changes thoroughly
- Update documentation if needed

### 4. Submit a Pull Request
- Ensure your code builds successfully
- Write a clear PR description
- Reference any related issues
- Request review from maintainers

## 🏗️ Architecture Guidelines

### Frontend (Blazor WebAssembly)
- Use Blazor components for UI elements
- Implement JavaScript interop for complex libraries (Excalidraw, Tone.js, etc.)
- Follow Bootstrap CSS framework conventions
- Keep components modular and reusable

### Backend (Azure Functions)
- Write functions for specific, focused tasks
- Use dependency injection for services
- Implement proper error handling and logging
- Follow Azure Functions best practices

### Code Quality
- Use meaningful variable and method names
- Add XML documentation comments to public APIs
- Follow C# naming conventions
- Keep methods focused and testable

## 🧪 Testing Strategy

### Unit Tests
- Write unit tests for business logic
- Aim for high test coverage on critical paths
- Use xUnit testing framework

### Integration Tests
- Test Azure Function endpoints
- Verify database operations
- Test file upload/download workflows

### Cost-Aware Testing
- Test within Azure free tier limits
- Monitor function execution counts
- Validate storage usage

## 📊 Cost Management

MindfulMuse is designed to run within Azure's always-free tier. Contributors should:

- **Monitor Usage**: Check Azure portal for usage metrics
- **Optimize Performance**: Minimize function execution time
- **Storage Awareness**: Be mindful of blob storage limits
- **Database Efficiency**: Use Cosmos DB RU/s efficiently

### Cost Control Checklist
- [ ] Function executions stay under 1M/month
- [ ] Blob storage under 5GB total
- [ ] Cosmos DB under 1K RU/s
- [ ] No unexpected charges in development

## 🎨 UI/UX Guidelines

### Design Principles
- **Intuitive Navigation**: Clear module switching interface
- **Responsive Design**: Works on desktop and mobile
- **Accessibility**: Follow WCAG guidelines
- **Performance**: Fast loading and smooth interactions

### Color Scheme
- Primary: Bootstrap blue variants
- Secondary: Custom color palettes from design module
- Status: Green (success), Yellow (warning), Red (error)

## 🔒 Security Considerations

### Azure Security
- Use managed identities for Azure resources
- Store secrets in Azure Key Vault
- Implement proper authentication/authorization
- Follow Azure security best practices

### Code Security
- Avoid hardcoding secrets
- Use parameterized queries
- Validate all user inputs
- Implement proper error handling

## 📝 Documentation

### Code Documentation
- Add XML comments to public methods and classes
- Document complex algorithms and business logic
- Keep comments up-to-date with code changes

### User Documentation
- Update README.md for new features
- Add usage examples and screenshots
- Document configuration options

## 🤝 Code Review Process

### Review Checklist
- [ ] Code builds successfully
- [ ] Tests pass
- [ ] Follows coding standards
- [ ] No security vulnerabilities
- [ ] Documentation updated
- [ ] Performance considerations addressed

### Review Guidelines
- Be constructive and respectful
- Focus on code quality and maintainability
- Suggest improvements, don't demand changes
- Acknowledge good practices

## 📞 Communication

### Getting Help
- **Issues**: Use GitHub Issues for bugs and feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Discord/Slack**: Join our community chat (if available)

### Reporting Issues
- Use issue templates when available
- Provide clear reproduction steps
- Include environment details
- Attach screenshots for UI issues

## 🎯 Contribution Types

### Code Contributions
- Bug fixes
- New features
- Performance improvements
- Security enhancements

### Non-Code Contributions
- Documentation improvements
- UI/UX design suggestions
- Testing and QA
- Community support

## 📄 License

By contributing to MindfulMuse, you agree that your contributions will be licensed under the same MIT License that covers the project.

## 🙏 Recognition

Contributors will be recognized in:
- Repository contributors list
- Release notes for significant contributions
- Project documentation

Thank you for contributing to MindfulMuse! Your efforts help make creative tools more accessible to everyone.
