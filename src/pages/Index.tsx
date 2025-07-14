import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Icon from "@/components/ui/icon";

const Index = () => {
  const documentStats = [
    { label: "Всего документов", value: 1247, icon: "FileText", color: "bg-blue-500" },
    { label: "На рассмотрении", value: 23, icon: "Clock", color: "bg-yellow-500" },
    { label: "Утверждено", value: 1156, icon: "CheckCircle", color: "bg-green-500" },
    { label: "Отклонено", value: 68, icon: "XCircle", color: "bg-red-500" },
  ];

  const recentDocuments = [
    { id: "DOC-001", title: "Техническое задание ПТО", status: "На рассмотрении", user: "Иванов И.И.", date: "14.07.2025" },
    { id: "DOC-002", title: "Протокол технадзора", status: "Утверждено", user: "Петров П.П.", date: "13.07.2025" },
    { id: "DOC-003", title: "Акт СДО", status: "Отклонено", user: "Сидоров С.С.", date: "12.07.2025" },
    { id: "DOC-004", title: "Инструкция по безопасности", status: "Утверждено", user: "Козлов К.К.", date: "11.07.2025" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "На рассмотрении": return "bg-yellow-100 text-yellow-800";
      case "Утверждено": return "bg-green-100 text-green-800";
      case "Отклонено": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center">
                  <Icon name="FileText" className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800">Система управления документами</h1>
                  <p className="text-sm text-slate-600">Корпоративный портал</p>
                </div>
              </div>
            </div>
            <nav className="flex space-x-8">
              <Button variant="ghost" className="text-slate-700 hover:text-slate-900">
                <Icon name="Building" className="w-4 h-4 mr-2" />
                СДО
              </Button>
              <Button variant="ghost" className="text-slate-700 hover:text-slate-900">
                <Icon name="Settings" className="w-4 h-4 mr-2" />
                ПТО
              </Button>
              <Button variant="ghost" className="text-slate-700 hover:text-slate-900">
                <Icon name="Shield" className="w-4 h-4 mr-2" />
                Технадзор
              </Button>
              <Button variant="ghost" className="text-slate-700 hover:text-slate-900">
                <Icon name="Info" className="w-4 h-4 mr-2" />
                Информация
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {documentStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <Icon name={stat.icon} className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Documents */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="FileText" className="w-5 h-5 mr-2" />
                  Последние документы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Название</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Пользователь</TableHead>
                      <TableHead>Дата</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">{doc.id}</TableCell>
                        <TableCell>{doc.title}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={getStatusColor(doc.status)}>
                            {doc.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{doc.user}</TableCell>
                        <TableCell>{doc.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Progress */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Zap" className="w-5 h-5 mr-2" />
                  Быстрые действия
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" variant="default">
                  <Icon name="Upload" className="w-4 h-4 mr-2" />
                  Загрузить документ
                </Button>
                <Button className="w-full" variant="outline">
                  <Icon name="Search" className="w-4 h-4 mr-2" />
                  Найти документ
                </Button>
                <Button className="w-full" variant="outline">
                  <Icon name="BarChart" className="w-4 h-4 mr-2" />
                  Отчеты
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="TrendingUp" className="w-5 h-5 mr-2" />
                  Статистика обработки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-600">Обработано сегодня</span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-600">Просрочено</span>
                    <span className="text-sm font-medium">12%</span>
                  </div>
                  <Progress value={12} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-600">В работе</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Document Categories */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Icon name="FolderOpen" className="w-5 h-5 mr-2" />
              Категории документов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="sdo" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="sdo">СДО</TabsTrigger>
                <TabsTrigger value="pto">ПТО</TabsTrigger>
                <TabsTrigger value="tech">Технадзор</TabsTrigger>
                <TabsTrigger value="info">Информация</TabsTrigger>
              </TabsList>
              <TabsContent value="sdo" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Строительные документы</h3>
                    <p className="text-sm text-slate-600 mb-4">Проектная документация, акты, справки</p>
                    <Button variant="outline" size="sm">Открыть</Button>
                  </Card>
                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Разрешения</h3>
                    <p className="text-sm text-slate-600 mb-4">Лицензии, сертификаты, разрешения</p>
                    <Button variant="outline" size="sm">Открыть</Button>
                  </Card>
                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Отчеты</h3>
                    <p className="text-sm text-slate-600 mb-4">Отчеты о выполненных работах</p>
                    <Button variant="outline" size="sm">Открыть</Button>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="pto" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Технические задания</h3>
                    <p className="text-sm text-slate-600 mb-4">ТЗ на выполнение работ</p>
                    <Button variant="outline" size="sm">Открыть</Button>
                  </Card>
                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Планы</h3>
                    <p className="text-sm text-slate-600 mb-4">Планы и схемы объектов</p>
                    <Button variant="outline" size="sm">Открыть</Button>
                  </Card>
                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Инструкции</h3>
                    <p className="text-sm text-slate-600 mb-4">Техническая документация</p>
                    <Button variant="outline" size="sm">Открыть</Button>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="tech" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Акты проверок</h3>
                    <p className="text-sm text-slate-600 mb-4">Результаты технического надзора</p>
                    <Button variant="outline" size="sm">Открыть</Button>
                  </Card>
                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Замечания</h3>
                    <p className="text-sm text-slate-600 mb-4">Выявленные нарушения</p>
                    <Button variant="outline" size="sm">Открыть</Button>
                  </Card>
                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Предписания</h3>
                    <p className="text-sm text-slate-600 mb-4">Требования к устранению</p>
                    <Button variant="outline" size="sm">Открыть</Button>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="info" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Справочники</h3>
                    <p className="text-sm text-slate-600 mb-4">Нормативные документы</p>
                    <Button variant="outline" size="sm">Открыть</Button>
                  </Card>
                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Контакты</h3>
                    <p className="text-sm text-slate-600 mb-4">Контактная информация</p>
                    <Button variant="outline" size="sm">Открыть</Button>
                  </Card>
                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Помощь</h3>
                    <p className="text-sm text-slate-600 mb-4">Инструкции по работе</p>
                    <Button variant="outline" size="sm">Открыть</Button>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;