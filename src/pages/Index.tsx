import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Index = () => {
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const documentStats = [
    { label: "Всего документов", value: 1247, icon: "FileText", color: "bg-blue-500" },
    { label: "На рассмотрении", value: 23, icon: "Clock", color: "bg-yellow-500" },
    { label: "Утверждено", value: 1156, icon: "CheckCircle", color: "bg-green-500" },
    { label: "Отклонено", value: 68, icon: "XCircle", color: "bg-red-500" },
  ];

  const recentDocuments = [
    { 
      id: "DOC-001", 
      title: "Техническое задание ПТО", 
      status: "На рассмотрении", 
      user: "Иванов И.И.", 
      date: "14.07.2025", 
      time: "14:30",
      fileType: "PDF",
      fileSize: "2.4 MB",
      version: "1.2",
      category: "ПТО",
      history: [
        { action: "Создан", user: "Иванов И.И.", date: "14.07.2025", time: "10:15", status: "Черновик" },
        { action: "Отправлен на рассмотрение", user: "Иванов И.И.", date: "14.07.2025", time: "14:30", status: "На рассмотрении" }
      ]
    },
    { 
      id: "DOC-002", 
      title: "Протокол технадзора", 
      status: "Утверждено", 
      user: "Петров П.П.", 
      date: "13.07.2025", 
      time: "16:45",
      fileType: "DOCX",
      fileSize: "1.8 MB",
      version: "2.0",
      category: "Технадзор",
      history: [
        { action: "Создан", user: "Петров П.П.", date: "12.07.2025", time: "09:00", status: "Черновик" },
        { action: "Отправлен на рассмотрение", user: "Петров П.П.", date: "12.07.2025", time: "17:30", status: "На рассмотрении" },
        { action: "Утвержден", user: "Козлов К.К.", date: "13.07.2025", time: "16:45", status: "Утверждено" }
      ]
    },
    { 
      id: "DOC-003", 
      title: "Акт СДО", 
      status: "Отклонено", 
      user: "Сидоров С.С.", 
      date: "12.07.2025", 
      time: "11:20",
      fileType: "PDF",
      fileSize: "3.1 MB",
      version: "1.0",
      category: "СДО",
      history: [
        { action: "Создан", user: "Сидоров С.С.", date: "11.07.2025", time: "14:00", status: "Черновик" },
        { action: "Отправлен на рассмотрение", user: "Сидоров С.С.", date: "11.07.2025", time: "18:00", status: "На рассмотрении" },
        { action: "Отклонен", user: "Иванов И.И.", date: "12.07.2025", time: "11:20", status: "Отклонено", comment: "Не соответствует требованиям" }
      ]
    },
    { 
      id: "DOC-004", 
      title: "Инструкция по безопасности", 
      status: "Утверждено", 
      user: "Козлов К.К.", 
      date: "11.07.2025", 
      time: "09:15",
      fileType: "DOCX",
      fileSize: "856 KB",
      version: "3.1",
      category: "Информация",
      history: [
        { action: "Создан", user: "Козлов К.К.", date: "10.07.2025", time: "10:30", status: "Черновик" },
        { action: "Отправлен на рассмотрение", user: "Козлов К.К.", date: "10.07.2025", time: "16:45", status: "На рассмотрении" },
        { action: "Утвержден", user: "Петров П.П.", date: "11.07.2025", time: "09:15", status: "Утверждено" }
      ]
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "На рассмотрении": return "bg-yellow-100 text-yellow-800";
      case "Утверждено": return "bg-green-100 text-green-800";
      case "Отклонено": return "bg-red-100 text-red-800";
      case "Черновик": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "PDF": return "FileText";
      case "DOCX": return "FileText";
      case "XLSX": return "FileSpreadsheet";
      case "PNG":
      case "JPG":
      case "JPEG": return "Image";
      default: return "File";
    }
  };

  const filteredDocuments = recentDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doc.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

        {/* Search and Filters */}
        <div className="mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input 
                      placeholder="Поиск по названию или ID документа..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full sm:w-48">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Статус" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все статусы</SelectItem>
                      <SelectItem value="Черновик">Черновик</SelectItem>
                      <SelectItem value="На рассмотрении">На рассмотрении</SelectItem>
                      <SelectItem value="Утверждено">Утверждено</SelectItem>
                      <SelectItem value="Отклонено">Отклонено</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
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
                      <TableHead>Документ</TableHead>
                      <TableHead>Тип</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Последнее изменение</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.map((doc) => (
                      <TableRow key={doc.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <Icon name={getFileIcon(doc.fileType)} className="w-8 h-8 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{doc.title}</div>
                              <div className="text-sm text-gray-500">{doc.id} • {doc.fileSize} • v{doc.version}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{doc.fileType}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={getStatusColor(doc.status)}>
                            {doc.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">{doc.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm font-medium">{doc.user}</div>
                              <div className="text-xs text-gray-500">{doc.date} {doc.time}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedDocument(doc)}
                            >
                              <Icon name="Eye" className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Icon name="Download" className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Icon name="MoreHorizontal" className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
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
                <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full" variant="default">
                      <Icon name="Upload" className="w-4 h-4 mr-2" />
                      Загрузить документ
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                      <DialogTitle>Загрузить новый документ</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Название документа</label>
                        <Input placeholder="Введите название..." />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Категория</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите категорию" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sdo">СДО</SelectItem>
                            <SelectItem value="pto">ПТО</SelectItem>
                            <SelectItem value="tech">Технадзор</SelectItem>
                            <SelectItem value="info">Информация</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Описание</label>
                        <Textarea placeholder="Краткое описание документа..." />
                      </div>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Icon name="Upload" className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-sm text-gray-600 mb-2">Перетащите файл сюда или нажмите для выбора</p>
                        <p className="text-xs text-gray-500">Поддерживаются: PDF, DOC, DOCX, XLS, XLSX, PNG, JPG</p>
                        <Button variant="outline" className="mt-2">Выбрать файл</Button>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>Отмена</Button>
                        <Button onClick={() => setIsUploadDialogOpen(false)}>Загрузить</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
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

        {/* Document Details Modal */}
        {selectedDocument && (
          <Dialog open={!!selectedDocument} onOpenChange={() => setSelectedDocument(null)}>
            <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <Icon name={getFileIcon(selectedDocument.fileType)} className="w-6 h-6" />
                  <span>{selectedDocument.title}</span>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                {/* Document Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">ID документа</label>
                    <p className="text-sm font-medium">{selectedDocument.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Версия</label>
                    <p className="text-sm font-medium">{selectedDocument.version}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Тип файла</label>
                    <p className="text-sm font-medium">{selectedDocument.fileType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Размер</label>
                    <p className="text-sm font-medium">{selectedDocument.fileSize}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Категория</label>
                    <p className="text-sm font-medium">{selectedDocument.category}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Текущий статус</label>
                    <Badge variant="secondary" className={getStatusColor(selectedDocument.status)}>
                      {selectedDocument.status}
                    </Badge>
                  </div>
                </div>

                {/* Status Change */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-3">Изменить статус</h3>
                  <div className="flex space-x-2">
                    <Select>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Новый статус" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Черновик</SelectItem>
                        <SelectItem value="review">На рассмотрении</SelectItem>
                        <SelectItem value="approved">Утверждено</SelectItem>
                        <SelectItem value="rejected">Отклонено</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button>Применить</Button>
                  </div>
                  <Textarea placeholder="Комментарий к изменению статуса..." className="mt-2" />
                </div>

                {/* History */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-3">История изменений</h3>
                  <div className="space-y-3">
                    {selectedDocument.history.map((item: any, index: number) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarFallback className="text-xs">{item.user.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium">{item.user}</span>
                            <span className="text-xs text-gray-500">{item.date} {item.time}</span>
                          </div>
                          <p className="text-sm text-gray-700">{item.action}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className={getStatusColor(item.status)}>
                              {item.status}
                            </Badge>
                            {item.comment && (
                              <span className="text-xs text-gray-600">• {item.comment}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-2 border-t pt-4">
                  <Button variant="outline">
                    <Icon name="Download" className="w-4 h-4 mr-2" />
                    Скачать
                  </Button>
                  <Button variant="outline">
                    <Icon name="Share" className="w-4 h-4 mr-2" />
                    Поделиться
                  </Button>
                  <Button onClick={() => setSelectedDocument(null)}>Закрыть</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </main>
    </div>
  );
};

export default Index;