using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using MindfulMuse;
using Blazored.LocalStorage;
using Blazored.SessionStorage;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

// Add services
builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

// Add local and session storage
builder.Services.AddBlazoredLocalStorage();
builder.Services.AddBlazoredSessionStorage();

// Add configuration for Azure services
builder.Configuration.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

await builder.Build().RunAsync();
